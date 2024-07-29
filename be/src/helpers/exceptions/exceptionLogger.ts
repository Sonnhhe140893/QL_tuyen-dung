import { BaseExceptionFilter } from "@nestjs/core";
import { ArgumentsHost } from "@nestjs/common";

export class ExceptionsLoggerFilter extends BaseExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
		console.log('exception.response------> ', exception);
        let message = exception.response?.message || 'error';
		if(exception?.response?.message && Array.isArray(exception?.response?.message)) {
			message = exception.response.message[0];
		}
		let responseError = {
			status: exception.statusCode == 400 && 'fail' ||'error' ,
			message: exception.response == 404 && 'Not found api' || message,
			code: exception.response?.code || ''
		};
        exception.response = responseError;
        super.catch(exception, host);
    }
}