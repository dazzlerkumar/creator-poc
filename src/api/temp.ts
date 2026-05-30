
import { clientApi } from "@/lib/api-client";
import Cookies from 'js-cookie';
import { COOKIES_KEYS } from "@/lib/constants";

export interface AuthApiResponse<T = unknown> {
    status: boolean;
    message: string;
    data: T;
    error: string | null;
}

export interface SendOtpRequest {
    phone: string;
    purpose: 'login';
    channel: 'sms';
}

export interface SendOtpResponseData {
    // NOTE: the reference code has a wrong spelling in the response
    refrence_code: string;
    reference_code: string;
    expiresIn: number;
}

export type SendOtpResponse = AuthApiResponse<SendOtpResponseData>;

export interface Account {
    id: string;
    email: string | null;
    password: string | null;
    phoneNumber: string;
    isPhoneNumberVerified: boolean;
    role: string;
    organizationId: number;
    freeMemberId: number;
    paidMemberId: number | null;
    tokenVersion: number;
    createdAt: string;
    updatedAt: string;
    facebookConfig: unknown | null;
    facebookVerified: boolean;
    googleConfig: unknown | null;
    googleVerified: boolean;
}

export interface FreeMember {
    id: number;
    phoneNumber: string;
    email: string | null;
    name: string;
    status: string;
    slug: string;
    deletedToken: string;
    createdAt: string;
    updatedAt: string;
    source: string | null;
    birthYear: number | null;
    gender: string | null;
}

export interface PaidMember {
    id: number;
    phoneNumber: string;
    email: string | null;
    name: string;
    status: string;
    slug: string;
    deletedToken: string;
    createdAt: string;
    updatedAt: string;
    source: string | null;
    birthYear: number | null;
    gender: string | null;
}

export interface VerifyOtpRequest {
    phone: string;
    reference_code: string;
    otp: string;
}
export interface LoginPayload {
    phoneNumber: string;
    name: string;
    sourceData: {
        type: 'ctwa';
    };
}

export interface LoginResponseData {
    // NOTE: the reference code has a wrong spelling in the response
    refrence_code: string;
    isNewUser: boolean;
}

export type LoginResponse = AuthApiResponse<LoginResponseData>;

export interface VerifyOtpResponseData {
    account: Account;
    freeMember: FreeMember;
    paidMember: PaidMember | null;
    accessToken: string;
    refreshToken: string;
}
export type VerifyOtpResponse = AuthApiResponse<VerifyOtpResponseData>;

const AUTH_URL = "https://auth-service.hb-stg.in/public/auth/v1";

export const AUTH_ENDPOINTS = {
    LOGIN: `${AUTH_URL}/login`,
    SEND_OTP: `${AUTH_URL}/send-otp`,
    VERIFY_OTP: `${AUTH_URL}/verify-otp`,
    REFRESH_TOKEN: `${AUTH_URL}/refresh-token`,
} as const;
export const authApi = {
    sendOtp: async (data: SendOtpRequest) => {
        return clientApi.post<SendOtpResponse>(AUTH_ENDPOINTS.SEND_OTP, data);
    },
    verifyOtp: async (data: VerifyOtpRequest) => {
        return clientApi.post<VerifyOtpResponse>(AUTH_ENDPOINTS.VERIFY_OTP, data);
    },
    logout: async () => {
        Cookies.remove(COOKIES_KEYS.ACCESS_TOKEN);
        Cookies.remove(COOKIES_KEYS.REFRESH_TOKEN);
        Cookies.remove("user-data");
        return { success: true };
    },
};