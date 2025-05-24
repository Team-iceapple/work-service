import { ServiceException } from '@/exceptions';
import { ServiceExceptionResponse } from '@/responses';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
    catch(exception: ServiceException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const status = exception.status;

        const body: ServiceExceptionResponse = {
            status,
            message: exception.message,
            path: request.url,
        };

        response.status(status).json(body);
    }
}
