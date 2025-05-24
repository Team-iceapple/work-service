import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { FILE_SERVE_PREFIX, FILE_UPLOAD_PATH } from '@/config';
import { serveFileMiddleware } from '@/middleware';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
    await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
