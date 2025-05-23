import { ServiceException } from './service-exception';
import { HttpStatus } from '@nestjs/common';

export class WorkNotFoundException extends ServiceException {
    constructor(id: string) {
        super(HttpStatus.NOT_FOUND, `${id} is Not Exists`);
    }
}
