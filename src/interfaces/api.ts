export interface PaginatedResponse {
    limit: number;
    page: number;
    total: number;
}

export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T | null;
    error: string | null;
}