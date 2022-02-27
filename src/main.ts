import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  await app.listen(5000);
}
bootstrap();


