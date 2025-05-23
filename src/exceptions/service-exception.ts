import type { HttpStatus } from '@nestjs/common';

export class ServiceException extends Error {
    constructor(
        public status: HttpStatus,
        public message: string,
    ) {
        super(message);
    }
}
