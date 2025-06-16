import {NextFunction, Request, Response} from 'express';
import {Logger} from '@nestjs/common';

const requestLogger = new Logger(requestLogMiddleware.name);

export function requestLogMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    requestLogger.log(`new Request [${req.method}] ${req.originalUrl}`);
    next();
}