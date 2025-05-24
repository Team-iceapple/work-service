import { Injectable } from '@nestjs/common';
import {
    MulterModuleOptions,
    MulterOptionsFactory,
} from '@nestjs/platform-express';

import { FILE_UPLOAD_PATH } from '@/config/constants';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            dest: FILE_UPLOAD_PATH,
        };
    }
}
