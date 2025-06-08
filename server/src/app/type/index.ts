export interface IResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
    meta?: {
        page: number;
        limit: number;
        skip: number;
        total: number
    }
}