# ADR-001: Next.js Static Export on AWS S3 + CloudFront

## Status

Accepted

## Date

2026-05-19

## Context

Next.js 16 app with multiple client-side routes. No SSR, API routes, or server actions needed. Options evaluated: AWS ECS, AWS Amplify, S3 + CloudFront.

Goal: low cost, no server ops, scalable.

---

## Decision

**Next.js `output: 'export'`** deployed to **AWS S3 + CloudFront**.

No Dockerfile. Deployment = build → sync to S3 → invalidate CloudFront cache.

---

## Consequences

### Positive

- Low cost (~$1–5/month)
- No server to manage or patch
- Global CDN via CloudFront
- Simple deploy pipeline
- Auto-scales

### Trade-offs

- No Next.js server features (see Constraints)
- All routes must be known at build time
- Dynamic data requires client-side calls to separate backend

---

## Constraints

`output: 'export'` disables:

| Feature                                          | Status | Reason                  |
| ------------------------------------------------ | ------ | ----------------------- |
| API Routes (`/api/*`)                            | ❌     | Needs Node.js server    |
| Server Actions                                   | ❌     | Needs Node.js server    |
| Middleware                                       | ❌     | Runs on server/edge     |
| ISR / `revalidate`                               | ❌     | Needs runtime           |
| `next/headers`, `cookies()`                      | ❌     | Server-only APIs        |
| Dynamic routes without `generateStaticParams`    | ❌     | No runtime to resolve   |
| `next/image` optimization                        | ⚠️     | Use `unoptimized: true` |
| Static routes                                    | ✅     | Pre-rendered at build   |
| Dynamic routes with `generateStaticParams`       | ✅     | Pre-rendered at build   |
| Client-side navigation (`<Link>`, `router.push`) | ✅     | Runs in browser         |
| Client-side data fetching                        | ✅     | Runs in browser         |

---

## Architecture

```
User Request
     │
     ▼
CloudFront (CDN + HTTPS + Routing)
     │
     ▼ (Origin Access Control — private)
S3 Bucket (HTML/JS/CSS)
```

---

## Implementation

### 1. Next.js Config

```js
// next.config.js
const nextConfig = {
  output: "export",
  trailingSlash: true, // generates /about/index.html — cleaner on S3
  images: {
    unoptimized: true, // required for static export
  },
};

module.exports = nextConfig;
```

`trailingSlash: true` generates folder-style paths (`/about/index.html`). S3 serves these natively — less URL rewriting needed.

### 2. Build

```bash
npm run build
# output in /out
```

### 3. S3

```bash
aws s3 mb s3://your-site-name
aws s3 sync out/ s3://your-site-name --delete
```

- Block all public access — CloudFront uses OAC to access S3 privately
- Don't enable S3 static website hosting — CloudFront handles it

### 4. CloudFront

**Create OAC:**

- Console → CloudFront → Origin Access Control → Create
- Origin type: S3, Signing: Sign requests

**Create Distribution:**

- Origin: S3 bucket
- Origin access: OAC above
- Default root object: `index.html`
- Viewer protocol: Redirect HTTP to HTTPS
- Price class: match target regions

**S3 Bucket Policy** (CloudFront generates this — apply it):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-site-name/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DIST_ID"
        }
      }
    }
  ]
}
```

### 5. Routing Fix

#### Option A — Error Pages (Simple)

CloudFront → Error Pages:

| HTTP Error | Response Path | Response Code |
| ---------- | ------------- | ------------- |
| 403        | `/index.html` | 200           |
| 404        | `/index.html` | 200           |

Falls back to `index.html` for all unresolved paths. Next.js client router takes over. Downside: all routes serve same HTML initially.

#### Option B — CloudFront Function (Recommended)

Serves correct HTML per route. Attach to **Viewer Request** on default cache behaviour.

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Has file extension — leave it (JS, CSS, images)
  if (uri.match(/\.[a-zA-Z0-9]+$/)) {
    return request;
  }

  // Add trailing slash
  if (!uri.endsWith("/")) {
    uri = uri + "/";
  }

  request.uri = uri + "index.html";
  return request;
}
```

### 6. Custom Domain

```bash
# ACM cert must be us-east-1 for CloudFront
aws acm request-certificate \
  --domain-name yourdomain.com \
  --validation-method DNS \
  --region us-east-1
```

CloudFront: add alternate domain + attach cert.

DNS:

```
yourdomain.com  CNAME  d1234abcd.cloudfront.net
```

### 7. Deploy Script

```bash
#!/bin/bash
set -e

BUCKET="your-site-name"
DIST_ID="YOUR_CLOUDFRONT_DIST_ID"

echo "Building..."
npm run build

echo "Uploading to S3..."
aws s3 sync out/ s3://$BUCKET --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $DIST_ID \
  --paths "/*"

echo "Done."
```

---

## Known Issues

### 1. Direct URL visits return 403 or 404

S3 returns 403/404 when path has no matching file key. `/about` looks for file named `about` — doesn't exist.

Fix: CloudFront Function (Option B) rewrites `/about` → `/about/index.html`. With `trailingSlash: true`, every route maps to real S3 file.

---

### 2. `next/image` build error

Image optimization needs server to resize on demand — not available in static export.

Fix:

```js
images: {
  unoptimized: true,
}
```

---

### 3. Dynamic routes return 404

`/blog/[slug]` can't resolve at runtime — no server.

Fix: export all paths at build time:

```ts
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

Pre-renders `/blog/hello/index.html`, `/blog/world/index.html`, etc.

---

### 4. Stale files in S3 after route removal

`aws s3 sync` only uploads new/changed files. Deleted routes leave orphaned HTML in S3.

Fix: always use `--delete`:

```bash
aws s3 sync out/ s3://your-site-name --delete
```

---

### 5. Stale content after deploy

CloudFront caches at edge. New S3 files don't propagate automatically.

Fix: invalidate after every deploy:

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

---

### 6. Env vars missing at runtime

No runtime in static export. Vars must be present at build time.

Fix: prefix with `NEXT_PUBLIC_` — inlined into JS bundle during `npm run build`:

```bash
# .env.production
NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
```

`NEXT_PUBLIC_` vars are embedded in client bundle — visible to anyone. Don't put secrets here.

---

### 7. CORS errors on API calls

Site served from CloudFront (`app.yourdomain.com`). Browser blocks cross-origin requests without CORS headers.

Fix: set on backend API:

```
Access-Control-Allow-Origin: https://app.yourdomain.com
```

---

## Local Testing

```bash
npm run build && npx serve out
```

`npx serve` resolves `/about` → `about/index.html` — mirrors CloudFront behaviour.

Add to `package.json`:

```json
"preview": "npm run build && npx serve out"
```

---

## Alternatives Considered

### AWS ECS — Rejected

Full Next.js feature set but ~$30+/month (ECS + ALB) and container ops overhead. App needs none of those features.

### AWS Amplify — Considered

Wraps S3 + CloudFront with CI/CD. Valid choice. Rejected for direct infrastructure control and lower abstraction.

### Vercel / Netlify — Out of scope

Best Next.js static export DX. Ruled out — must host on AWS.

---

## References

- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [CloudFront Origin Access Control](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
- [CloudFront Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html)
- [AWS ACM for CloudFront](https://docs.aws.amazon.com/acm/latest/userguide/acm-regions.html)
