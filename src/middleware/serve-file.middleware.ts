import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export function serveFileMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const accept = req.get('Accept') ?? null;

    if (!accept || accept === '*/*')
        return res
            .status(HttpStatus.BAD_REQUEST)
            .type('application/json')
            .send({
                message:
                    "Accept header must be set to 'image/png', 'image/jpeg', or 'application/pdf'\n",
                statusCode: HttpStatus.BAD_REQUEST,
            });

    let contentType: string;

    if (accept.includes('image/')) {
        const match = accept.match(/image\/(png|jpg|jpeg)/);
        contentType = match ? match[0] : 'image/png';
    } else if (accept.includes('application/pdf')) {
        contentType = 'application/pdf';
    } else {
        contentType = 'application/octet-stream';
    }

    res.setHeader('Content-Type', contentType);
    next();
}
