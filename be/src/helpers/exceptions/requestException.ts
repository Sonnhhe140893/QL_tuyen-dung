import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomRequestException extends HttpException {
	constructor({ status, message, code}: {status: string; message: string; code?: string; }) {
		super(
			HttpException.createBody({
				status: status,
				message: message,
				code: code ? code : 0,
			}),
			HttpStatus.BAD_REQUEST
		);
	}
}


export class BadRequestException extends HttpException {
    constructor({ code, message, data }: { code?: string; message?: string, data?: any }) {
        super(
            HttpException.createBody({
                code,
                message: message || "error",
                error: 'Bad Request',
                status: "fail",
				data: {...data}
            }),
            HttpStatus.BAD_REQUEST,
        )
    }
}