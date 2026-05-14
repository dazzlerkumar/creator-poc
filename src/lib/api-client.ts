import Cookies from 'js-cookie';
import { CookiesKeys } from '@/interfaces/enums';
import { useAuthStore } from '@/stores/auth-store';
import { API_VERSION, APP_NAME } from './constants';
import { authApi } from '@/api/auth';
import { AUTH_ENDPOINTS } from '@/config/endpoints';
import { COOKIES_EXPIRY } from './constants';
import { ApiResponse } from '@/interfaces/api';

let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string | null) => void) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token: string | null) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}

async function handleUnauthorized<T>(
    retryFn: (headers: Record<string, string>) => Promise<T>,
    headers: Record<string, string>,
): Promise<T> {
    if (!isRefreshing) {
        isRefreshing = true;
        const newToken = await refreshToken();
        isRefreshing = false;

        if (newToken) {
            onRefreshed(newToken);
        } else {
            onRefreshed(null);
            authApi.logout();
            window.location.href = '/auth/login';
            throw new Error('Session expired');
        }
    }

    return new Promise((resolve, reject) => {
        subscribeTokenRefresh(async (token: string | null) => {
            if (!token) {
                reject(new Error('Session expired'));
                return;
            }
            const retryHeaders = {
                ...headers,
                Authorization: `Bearer ${token}`,
            };
            resolve(retryFn(retryHeaders));
        });
    });
}

async function refreshToken(): Promise<string | null> {
    const refreshTokenValue = Cookies.get(CookiesKeys.REFRESH_TOKEN);
    if (!refreshTokenValue) return null;

    try {
        const res = await fetch(AUTH_ENDPOINTS.REFRESH_TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: refreshTokenValue }),
        });

        if (!res.ok) throw new Error('Refresh failed');

        const result = await res.json();

        const data = result.data || result;
        const accessToken = data.accessToken || data.access_token;
        const newRefreshToken = data.refreshToken || data.refresh_token;

        if (!accessToken) {
            console.error('No access token in refresh response', result);
            return null;
        }

        const cookieOptions = {
            expires: COOKIES_EXPIRY / (24 * 60 * 60),
            path: '/',
            secure: true,
            sameSite: 'lax' as const,
        };

        Cookies.set(CookiesKeys.ACCESS_TOKEN, accessToken, cookieOptions);

        if (newRefreshToken) {
            Cookies.set(CookiesKeys.REFRESH_TOKEN, newRefreshToken, cookieOptions);
        }

        // Sync with useAuthStore
        useAuthStore.getState().setToken(accessToken, useAuthStore.getState().role, data.expiry || (Date.now() / 1000 + 3600));

        return accessToken;
    } catch (error) {
        console.error('Token refresh error:', error);
        return null;
    }
}

function generateClientUrl(endpoint: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
        return endpoint;
    }
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
        throw new Error('NEXT_PUBLIC_BACKEND_URL environment variable is not set.');
    }
    return `${backendUrl}/api/${API_VERSION}/${APP_NAME}${endpoint}`;
}

type ClientFetchOptions = RequestInit & {
    skipAuth?: boolean;
};

export async function clientApiRequest<T>(
    endpoint: string,
    options: ClientFetchOptions = {},
): Promise<T> {
    const url = generateClientUrl(endpoint);
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (!options.skipAuth) {
        const token = Cookies.get(CookiesKeys.ACCESS_TOKEN);
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const res = await fetch(url, {
        ...options,
        headers,
    });

    if (!res.ok) {
        if (res.status === 401 && !options.skipAuth) {
            return handleUnauthorized(
                (retryHeaders) =>
                    clientApiRequest<T>(endpoint, { ...options, headers: retryHeaders }),
                headers,
            );
        }

        const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || errorData.error || `Request failed with status ${res.status}`);
    }

    const result = (await res.json()) as ApiResponse<T> | T;

    // If it's the standard ApiResponse structure, return the data part
    if (result && typeof result === 'object' && 'status' in result && 'data' in result) {
        if (!result.status) {
            throw new Error(result.message || 'API error');
        }
        return result.data as T;
    }

    return result as T;
}

export async function clientApiRequestBinary(
    endpoint: string,
    options: ClientFetchOptions = {},
): Promise<{ data: ArrayBuffer; headers: Headers; status: number }> {
    const url = generateClientUrl(endpoint);
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (!options.skipAuth) {
        const token = Cookies.get(CookiesKeys.ACCESS_TOKEN);
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const res = await fetch(url, {
        ...options,
        headers,
    });

    if (!res.ok) {
        if (res.status === 401 && !options.skipAuth) {
            return handleUnauthorized(
                (retryHeaders) =>
                    clientApiRequestBinary(endpoint, {
                        ...options,
                        headers: retryHeaders,
                    }),
                headers,
            );
        }

        const text = await res.text().catch(() => 'Unknown error');
        throw new Error(`${res.status} ${res.statusText}: ${text}`);
    }

    const buf = await res.arrayBuffer();
    return { data: buf, headers: res.headers, status: res.status };
}

export const clientApi = {
    get: <T>(endpoint: string, options?: ClientFetchOptions) =>
        clientApiRequest<T>(endpoint, { ...options, method: 'GET' }),
    post: <T>(endpoint: string, body?: unknown, options?: ClientFetchOptions) =>
        clientApiRequest<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        }),
    put: <T>(endpoint: string, body?: unknown, options?: ClientFetchOptions) =>
        clientApiRequest<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        }),
    patch: <T>(endpoint: string, body?: unknown, options?: ClientFetchOptions) =>
        clientApiRequest<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(body),
        }),
    del: <T>(endpoint: string, options?: ClientFetchOptions) =>
        clientApiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
    getBinary: (endpoint: string, options?: ClientFetchOptions) =>
        clientApiRequestBinary(endpoint, { ...options, method: 'GET' }),
    postBinary: (
        endpoint: string,
        body?: unknown,
        options?: ClientFetchOptions,
    ) =>
        clientApiRequestBinary(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        }),
};
