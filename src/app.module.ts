import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from '@/app.controller';
import { AppRepository } from '@/app.repository';
import { AppService } from '@/app.service';
import { MulterConfigService, configValidate } from '@/config';
import { AppMapper } from '@/utils';

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
