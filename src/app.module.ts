import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from '@/app.controller';
import { AppRepository } from '@/app.repository';
import { AppService } from '@/app.service';
import {
    MulterConfigService,
    configValidate,
    kyselyConfigFactory,
} from '@/config';
import { AppMapper } from '@/utils';
import { KyselyModule } from 'nestjs-kysely';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: configValidate,
        }),
        KyselyModule.forRootAsync({
            inject: [ConfigService],
            useFactory: kyselyConfigFactory,
        }),
        MulterModule.registerAsync({
            useClass: MulterConfigService,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, AppRepository, AppMapper],
})
export class AppModule {}
