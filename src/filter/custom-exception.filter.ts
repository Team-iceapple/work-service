import {ServiceExceptionResponse} from '@/responses';
import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';

type NestJsExceptionResponse = {
    message: string | string[];
    statusCode: number;
    error: string;
}

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        let error: string;
        let status: HttpStatus;
        let message: string | string[];

        if (exception instanceof HttpException
        ) {
            const response = exception.getResponse() as NestJsExceptionResponse;

            if (exception instanceof BadRequestException) message = response.message;
            else message = exception.message;

            status = exception.getStatus();
            error = response.error;
        } else {
            error = 'Internal Server Error';
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal server error';
        }

        const body: ServiceExceptionResponse = {
            status,
            message,
            error,
            path: request.url,
        };

        response.status(status).json(body);
    }
}
