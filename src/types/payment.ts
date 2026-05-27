
export enum PaymentStatus {
    IDLE = 'idle',
    PROCESSING = 'processing',
    SUCCESS = 'success',
    FAILED = 'failed',
}

export interface Plan {
    id: string;
    label: string;
    amount: number;
    display: string;
    badge: string;
    currency: string;
}