import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '@/app.module';
import {
    Environment,
    EnvironmentVariables,
    FILE_SERVE_PREFIX,
    FILE_UPLOAD_PATH,
} from '@/config';
import { CustomExceptionFilter } from '@/filter';
import { serveFileMiddleware } from '@/middleware';
import { requestLogMiddleware } from '@/middleware/request-log-middleware';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService =
        app.get<ConfigService<EnvironmentVariables, true>>(ConfigService);

    const port = configService.get<number>('PORT');

    if (configService.get<Environment>('NODE_ENV') === 'production')
        app.setGlobalPrefix('iceapple/project');
    app.use(requestLogMiddleware);
    app.use(FILE_SERVE_PREFIX, serveFileMiddleware);
    app.useStaticAssets(FILE_UPLOAD_PATH, {
        prefix: FILE_SERVE_PREFIX,
    });

    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    await app.listen(port);
}

void bootstrap();
