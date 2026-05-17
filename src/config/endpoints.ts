import { API_VERSION, APP_NAME } from '../lib/constants';

const BASE_API = `/api/${API_VERSION}/${APP_NAME}`;

export const AUTH_ENDPOINTS = {
    LOGIN: `${BASE_API}/auth/login`,
    REFRESH_TOKEN: `${BASE_API}/auth/refresh`,
    LOGOUT: `${BASE_API}/auth/logout`,
    TOKEN: `${BASE_API}/auth/token`,
};

export const PAYMENT_ENDPOINTS = {
    CREATE_ORDER: `${BASE_API}/payments/create-order`,
    VERIFY: `${BASE_API}/payments/verify`,
};
