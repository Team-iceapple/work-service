import { Module } from '@nestjs/common';

import { AppMapper } from '@/utils';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, AppRepository, AppMapper],
})
export class AppModule {}
