import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ─── Global prefix ──────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ─── CORS (local network access — no auth in Phase 1) ─────────────────────
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // ─── Validation pipe (applies class-validator DTOs globally) ───────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // strip unknown properties
      forbidNonWhitelisted: true,
      transform: true,       // auto-cast types
    }),
  );

  // ─── Swagger / OpenAPI docs ─────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('Ganesh Home Hub API')
    .setDescription('Smart-home ecosystem REST API')
    .setVersion('1.0')
    .addTag('devices')
    .addTag('routines')
    .addTag('assistant')
    .addTag('notifications')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`🏠 Ganesh Home Hub API running on http://0.0.0.0:${port}/api/v1`);
  console.log(`📚 Swagger docs at http://0.0.0.0:${port}/api/docs`);
}

bootstrap();
