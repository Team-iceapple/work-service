import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import {EnvironmentVariables, FILE_SERVE_PREFIX, FILE_UPLOAD_PATH} from '@/config';
import { serveFileMiddleware } from '@/middleware';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get<ConfigService<EnvironmentVariables, true>>(ConfigService);

    const port = configService.get<number>('PORT');

    app.use(FILE_SERVE_PREFIX, serveFileMiddleware);
    app.useStaticAssets(FILE_UPLOAD_PATH, {
        prefix: FILE_SERVE_PREFIX,
    });

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
