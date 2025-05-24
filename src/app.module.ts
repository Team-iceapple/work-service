import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { AppMapper } from '@/utils';
import {configValidate, MulterConfigService} from '@/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: configValidate,
        }),
        MulterModule.registerAsync({
            useClass: MulterConfigService,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, AppRepository, AppMapper],
})
export class AppModule {}
