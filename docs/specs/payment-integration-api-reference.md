# Habuild Payment Integration — API Reference

---

## Base URLs

| Environment | Base URL |
|-------------|----------|
| Dev | `https://payment-service.hb-dev.in` |
| Staging | `https://payment-service.hb-stg.in` |

---

## Authentication

- **Plan endpoints** — Bearer token required: `Authorization: Bearer <jwt>`
- **Payment endpoints** — No auth required (public)

---

## 1. List Plans

Fetch available plans with regional pricing. Pass `phoneNumber` to get the correct domestic/international pricing.

```
GET /public/plan/v1/
Authorization: Bearer <jwt>
```

**Query Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `category` | string | no | `regular`, `regular-hindi`, `special`, `premium`, `strong-everyday`, `strong-everyday-new`, `paid-challenge`, or `all` |
| `status` | string | no | `ACTIVE` \| `INACTIVE` — defaults to all |
| `type` | string | no | `STANDARD` (base plans) \| `UPGRADE` (add-on plans) |
| `phoneNumber` | string | no | Used for domestic/international detection; prefer this over IP detection |
| `freeMemberSlug` | string | no | Alternative to `phoneNumber` for geo detection |

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "42": {
      "id": 42,
      "name": "Habuild Premium 3 Months",
      "description": "3 month premium access to all live sessions",
      "category": "premium",
      "status": "ACTIVE",
      "rank": 1,
      "base_plan_id": null,
      "features": {},
      "programs": {},
      "metadata": {},
      "is_international": false,
      "country": "IND",
      "regions": {
        "IND": {
          "amount": 99900,
          "discounted_amount": 79900,
          "currency": "INR",
          "gateway_id": 1
        },
        "USA": {
          "amount": 2999,
          "discounted_amount": null,
          "currency": "USD",
          "gateway_id": 1
        }
      }
    }
  }
}
```

> Response is a map keyed by `plan_id` as a string, not an array. Use `Object.values()` to iterate.
>
> `discounted_amount` is the display price shown to the user. `amount` is what gets charged — always send `amount` to `create-order`.

---

## 2. Get Single Plan

```
GET /public/plan/v1/:id
Authorization: Bearer <jwt>
```

**Path Parameters:**

| Param | Type | Required |
|-------|------|----------|
| `id` | integer ≥ 1 | yes |

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "id": 42,
    "name": "Habuild Premium 3 Months",
    "description": "3 month premium access to all live sessions",
    "category": "premium",
    "status": "ACTIVE",
    "rank": 1,
    "base_plan_id": null,
    "features": {},
    "programs": {},
    "metadata": {},
    "is_international": false,
    "country": "IND",
    "regions": {
      "IND": {
        "amount": 99900,
        "discounted_amount": 79900,
        "currency": "INR",
        "gateway_id": 1
      }
    }
  }
}
```

**Error `404`:**
```json
{
  "status": 404,
  "message": "Plan not found"
}
```

---

## 3. Create Order

Creates a Razorpay order. Returns `gateway_order_id` to pass to the Razorpay checkout SDK.

```
POST /payment/create-order
Content-Type: application/json
```

**Request Body:**
```json
{
  "plan_id": 42,
  "amount": 99900,
  "currency": "INR",
  "phone_number": "+919876543210",
  "member_name": "Prakhar Agarwal",
  "member_email": "prakhar@habuild.in",
  "region_code": "IND",
  "notes": {}
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `plan_id` | integer | yes | From plan list |
| `amount` | integer | yes | In paise (₹999 = `99900`). Use `plan.regions.IND.amount` |
| `currency` | string | yes | Use `plan.regions.IND.currency` |
| `phone_number` | string | yes | International format e.g. `+919876543210` |
| `member_name` | string | yes | |
| `member_email` | string | no | Must be valid email or omitted |
| `region_code` | string | no | `IND` or `USA`, default `IND` |
| `notes` | object | no | Custom metadata passed through to Razorpay |

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-uuid",
    "orderId": "a1b2c3d4-uuid",
    "plan_id": 42,
    "amount": 99900,
    "currency": "INR",
    "status": "created",
    "member_name": "Prakhar Agarwal",
    "member_email": "prakhar@habuild.in",
    "phone_number": "+919876543210",
    "gateway_id": 1,
    "gateway_order_id": "order_XXXXXXXXXXXXXXXX",
    "metadata": {},
    "created_at": "2026-05-21T10:00:00.000Z",
    "updated_at": "2026-05-21T10:00:00.000Z"
  }
}
```

> Pass `data.gateway_order_id` to Razorpay checkout as `order_id`.
> Store `data.id` (internal UUID) — needed for verify-payment.

**Error `400`:**
```json
{
  "status": 400,
  "message": "Invalid phone number format"
}
```

**Error `500`:**
```json
{
  "status": 500,
  "message": "Failed to create Razorpay order"
}
```

---

## 4. Open Razorpay Checkout (Client-Side)

Not an API call — this runs in the browser using the Razorpay JS SDK.

```js
const rzp = new Razorpay({
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,  // from env
  order_id: order.gateway_order_id,               // from create-order
  amount: 99900,                                  // in paise
  currency: "INR",
  name: "Habuild",
  prefill: {
    contact: "+919876543210",
    email: "prakhar@habuild.in",
    name: "Prakhar Agarwal"
  },
  handler: function (response) {
    // response.razorpay_payment_id  → "pay_XXXXXXXX"
    // response.razorpay_order_id    → "order_XXXXXXXX"
    // response.razorpay_signature   → HMAC signature string
    verifyPayment(response);
  }
});
rzp.open();
```

---

## 5. Verify Payment

Verifies the Razorpay signature and marks the payment as successful on the server.

```
POST /payment/verify-payment
Content-Type: application/json
```

**Request Body:**
```json
{
  "order_id": "a1b2c3d4-uuid",
  "razorpay_payment_id": "pay_XXXXXXXXXXXXXXXX",
  "signature": "HMAC_SHA256_signature_string"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `order_id` | string (UUID) | yes | Internal order UUID from `create-order` response (`data.id`) — **not** the Razorpay `order_XXXX` ID |
| `razorpay_payment_id` | string | yes | From Razorpay checkout handler `response.razorpay_payment_id` |
| `signature` | string | yes | From Razorpay checkout handler `response.razorpay_signature` |

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "id": "payment-uuid",
    "order_id": "a1b2c3d4-uuid",
    "gateway_id": 1,
    "gateway_payment_id": "pay_XXXXXXXXXXXXXXXX",
    "gateway_signature": "HMAC_SHA256_signature_string",
    "status": "success",
    "amount": 99900,
    "currency": "INR",
    "amount_refunded": 0,
    "receipt": "receipt_XXXX",
    "phone_number": "+919876543210",
    "metadata": {},
    "settlement_id": null,
    "settled_at": null,
    "created_at": "2026-05-21T10:00:05.000Z",
    "updated_at": "2026-05-21T10:00:05.000Z"
  }
}
```

**Error `400` — invalid signature:**
```json
{
  "status": 400,
  "message": "Invalid payment signature"
}
```

**Error `404`:**
```json
{
  "status": 404,
  "message": "Order not found"
}
```

---

## 6. Get Payment Status

Poll this after verify-payment to confirm final status, or use as a fallback check.

```
GET /payment/status/:orderId
```

**Path Parameters:**

| Param | Type | Required | Notes |
|-------|------|----------|-------|
| `orderId` | string (UUID) | yes | Internal order UUID from `create-order` |

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "status": "success",
    "gateway_order_id": "order_XXXXXXXXXXXXXXXX",
    "gateway_payment_id": "pay_XXXXXXXXXXXXXXXX",
    "amount": 99900,
    "currency": "INR",
    "created_at": "2026-05-21T10:00:00.000Z",
    "updated_at": "2026-05-21T10:00:05.000Z"
  }
}
```

| `status` value | Meaning |
|----------------|---------|
| `created` | Order created, payment not yet attempted |
| `pending` | Payment initiated, awaiting confirmation |
| `success` | Payment captured successfully |
| `failed` | Payment failed |

**Error `404`:**
```json
{
  "status": 404,
  "message": "Order not found"
}
```

---

## 7. Get Payment Details (by Razorpay Payment ID)

Useful for showing a confirmation screen or receipt page.

```
GET /payment/details/:gatewayPaymentId
```

**Path Parameters:**

| Param | Type | Required |
|-------|------|----------|
| `gatewayPaymentId` | string | yes — Razorpay `pay_XXXX` ID |

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "amount": 99900,
    "amount_refunded": 0,
    "receipt": "receipt_XXXX",
    "currency": "INR",
    "status": "success",
    "order_id": "a1b2c3d4-uuid",
    "plan_id": 42,
    "member_name": "Prakhar Agarwal",
    "member_email": "prakhar@habuild.in",
    "phone_number": "+919876543210",
    "gateway_order_id": "order_XXXXXXXXXXXXXXXX",
    "gateway_payment_id": "pay_XXXXXXXXXXXXXXXX",
    "gateway_id": 1,
    "plan_category": "premium"
  }
}
```

---

## 8. Send Payment Receipt

Triggers a WhatsApp/email receipt to the user.

```
POST /payment/send-payment-receipt
Content-Type: application/json
```

**Request Body:**
```json
{
  "gatewayPaymentId": "pay_XXXXXXXXXXXXXXXX",
  "phoneNumber": "+919876543210",
  "name": "Prakhar Agarwal",
  "email": "prakhar@habuild.in",
  "city": "Delhi",
  "state": "Delhi",
  "pincode": "110001",
  "address": "123 Main St",
  "gstNumber": "22AAAAA0000A1Z5",
  "gstCompanyName": "Habuild Pvt Ltd",
  "date": "2026-05-21"
}
```

| Field | Required |
|-------|----------|
| `gatewayPaymentId` | yes |
| `phoneNumber` | yes |
| All others | no |

**Response `200`:**
```json
{
  "success": true,
  "message": "Payment receipt will be sent to the user"
}
```

---

## 9. Download Payment Receipt (PDF)

Returns a binary PDF file for download.

```
POST /payment/download-payment-receipt
Content-Type: application/json
```

**Request Body:**
```json
{
  "gatewayPaymentId": "pay_XXXXXXXXXXXXXXXX",
  "phoneNumber": "+919876543210",
  "name": "Prakhar Agarwal",
  "email": "prakhar@habuild.in",
  "city": "Delhi",
  "state": "Delhi",
  "pincode": "110001",
  "address": "123 Main St",
  "gstNumber": "22AAAAA0000A1Z5",
  "gstCompanyName": "Habuild Pvt Ltd",
  "date": "2026-05-21"
}
```

| Field | Required |
|-------|----------|
| `gatewayPaymentId` | yes |
| `phoneNumber` | yes |
| `name` | yes |
| All others | no |

**Response `200`:**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename=payment_receipt.pdf

<binary PDF>
```

---

## 10. Billing Details

### Get Billing Details

```
GET /payment/billing-details?gatewayPaymentId=pay_XXXXXXXX
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "id": "billing-uuid",
    "phone_number": "+919876543210",
    "gst_details": {
      "gst_name": "Habuild Pvt Ltd",
      "gst_number": "22AAAAA0000A1Z5"
    },
    "state": "Delhi",
    "city": "Delhi",
    "pincode": "110001",
    "metadata": {},
    "created_at": "2026-05-21T10:00:00.000Z",
    "updated_at": "2026-05-21T10:00:00.000Z"
  }
}
```

**Error `404`:**
```json
{
  "status": 404,
  "message": "Billing details not found"
}
```

### Save / Update Billing Details

```
PUT /payment/billing-details
Content-Type: application/json
```

**Request Body:**
```json
{
  "gatewayPaymentId": "pay_XXXXXXXXXXXXXXXX",
  "gst_details": {
    "gst_name": "Habuild Pvt Ltd",
    "gst_number": "22AAAAA0000A1Z5"
  },
  "state": "Delhi",
  "city": "Delhi",
  "pincode": "110001"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "id": "billing-uuid",
    "phone_number": "+919876543210",
    "gst_details": {
      "gst_name": "Habuild Pvt Ltd",
      "gst_number": "22AAAAA0000A1Z5"
    },
    "state": "Delhi",
    "city": "Delhi",
    "pincode": "110001",
    "created_at": "2026-05-21T10:00:00.000Z",
    "updated_at": "2026-05-21T10:00:00.000Z"
  }
}
```

---

## Standard Error Shape

All endpoints return errors in this format:

```json
{
  "status": 400,
  "message": "Human-readable error description",
  "code": "OPTIONAL_ERROR_CODE"
}
```

| HTTP Status | Meaning |
|-------------|---------|
| `400` | Validation error — missing/invalid fields |
| `401` | Unauthorized — missing or invalid Bearer token |
| `404` | Resource not found |
| `500` | Server or Razorpay API error |

---

## Complete Flow Summary

```
1. GET  /public/plan/v1/?phoneNumber=+91...      → choose plan, get plan.id + amount + currency
2. POST /payment/create-order                    → get order.id (UUID) + gateway_order_id
3. [client] Razorpay.open({ order_id: gateway_order_id })
4. POST /payment/verify-payment                  → confirm with razorpay_payment_id + signature
5. GET  /payment/status/:orderId                 → poll until status === "success"
6. GET  /payment/details/:gatewayPaymentId       → show confirmation screen
7. POST /payment/send-payment-receipt            → trigger WhatsApp/email receipt (optional)
```
