import {
    ClassSerializerInterceptor,
    Logger,
    ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: ['http://localhost:3000'],
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );

    const config = new DocumentBuilder()
        .setTitle('API Docs')
        .addCookieAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    await app.listen(4000);
    Logger.log(`🚀 Application is running`);
}
bootstrap();
