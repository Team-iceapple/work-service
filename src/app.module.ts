import { Module } from '@nestjs/common';
import {MulterModule} from '@nestjs/platform-express';

import { AppMapper } from '@/utils';
import {MulterConfigService} from '@/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: MulterConfigService,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, AppRepository, AppMapper],
})
export class AppModule {}
