import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { decodeJwt, isTokenExpired } from '../jwt-decode';

describe('jwt-decode', () => {
    describe('decodeJwt', () => {
        // A standard valid JWT for testing
        // Header: {"alg":"HS256","typ":"JWT"}
        // Payload: {"sub":"1234567890","name":"John Doe","iat":1516239022}
        const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

        it('should successfully decode a valid JWT', () => {
            const decoded = decodeJwt(validJwt);

            expect(decoded.header).toEqual({ alg: 'HS256', typ: 'JWT' });
            expect(decoded.payload).toEqual({ sub: '1234567890', name: 'John Doe', iat: 1516239022 });
            expect(decoded.signature).toBe('SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
        });

        it('should throw an error for a JWT with missing parts', () => {
            const invalidJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
            
            expect(() => decodeJwt(invalidJwt)).toThrow('Invalid JWT: expected 3 parts, got 2');
        });

        it('should throw an error for a JWT with too many parts', () => {
            const invalidJwt = 'header.payload.signature.extra';
            
            expect(() => decodeJwt(invalidJwt)).toThrow('Invalid JWT: expected 3 parts, got 4');
        });

        it('should handle JWT base64url padding correctly', () => {
            // Header: {"alg":"none"} -> eyJhbGciOiJub25lIn0= (padded), eyJhbGciOiJub25lIn0 (base64url)
            // Payload: {"a":"b"} -> eyJhIjoiYiJ9 (no padding needed for base64url)
            const token = 'eyJhbGciOiJub25lIn0.eyJhIjoiYiJ9.signature';
            const decoded = decodeJwt(token);

            expect(decoded.header).toEqual({ alg: 'none' });
            expect(decoded.payload).toEqual({ a: 'b' });
        });
    });

    describe('isTokenExpired', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('should return false if payload has no exp field', () => {
            const payload = { sub: '123' };
            expect(isTokenExpired(payload)).toBe(false);
        });

        it('should return false if current time is before exp', () => {
            const exp = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
            vi.setSystemTime(new Date((exp - 100) * 1000));
            
            expect(isTokenExpired({ exp })).toBe(false);
        });

        it('should return true if current time is exactly exp', () => {
            const exp = Math.floor(Date.now() / 1000) + 3600;
            vi.setSystemTime(new Date(exp * 1000));
            
            expect(isTokenExpired({ exp })).toBe(true);
        });

        it('should return true if current time is after exp', () => {
            const exp = Math.floor(Date.now() / 1000) + 3600;
            vi.setSystemTime(new Date((exp + 100) * 1000));
            
            expect(isTokenExpired({ exp })).toBe(true);
        });
    });
});
