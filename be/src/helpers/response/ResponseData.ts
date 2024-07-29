import { Paging } from './Paging';
import { HttpStatus } from "@nestjs/common";

export class ResponseData {
    readonly status: number;
    readonly message: string;
    readonly data: any;
    readonly meta?: Paging;
    readonly code?: number;

    constructor(status: number, data: any, message?: string, paging?: Paging, code?: number) {
        this.status = status;
        this.message = message || 'Success';
        this.data = data;
        this.meta = paging;
        this.code = code;
    }
}

export class Response {
    readonly status: string | number;
    readonly message: string;
    readonly data: any;
    readonly code?: any;

    constructor(status: string | number, data: any, message?: string, code?: string) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.code = code;
    }
}

export const BaseResponse = (status: string | number, data:any, code?: string, message?: string,) => {
    if(status == 'success' || status == 'fail' || status == HttpStatus.BAD_REQUEST) {
        let newData = ((status == 'fail' || status == HttpStatus.BAD_REQUEST) && data?.data) || data;

        let statusRs = status == 'success' ? 'success': 'fail';
        return new Response(statusRs, newData, message, data?.code || code);
    } else {
        return new Response('error', data?.data || [], message, data?.code || code );
    }
}
