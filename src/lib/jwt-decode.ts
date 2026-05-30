export interface JwtHeader {
    alg: string;
    typ: string;
    [key: string]: unknown;
}

export interface JwtPayload {
    iss?: string;
    sub?: string;
    aud?: string | string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    [key: string]: unknown;
    accountId?: string;
}

export interface DecodedJwt {
    header: JwtHeader;
    payload: JwtPayload;
    signature: string;
}

function base64UrlDecode(base64Url: string): string {
    // Replace URL-safe characters and add padding
    const base64 = base64Url
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(base64Url.length + ((4 - (base64Url.length % 4)) % 4), "=");

    return atob(base64);
}

function decodeJwt(token: string): DecodedJwt {
    const parts = token.split(".");

    if (parts.length !== 3) {
        throw new Error(`Invalid JWT: expected 3 parts, got ${parts.length}`);
    }

    const [encodedHeader, encodedPayload, signature] = parts;

    const header = JSON.parse(base64UrlDecode(encodedHeader!)) as JwtHeader;
    const payload = JSON.parse(base64UrlDecode(encodedPayload!)) as JwtPayload;

    return { header, payload, signature: signature! };
}

function isTokenExpired(payload: JwtPayload): boolean {
    if (payload.exp === undefined) return false;
    return Date.now() >= payload.exp * 1000;
}

export { decodeJwt, isTokenExpired };