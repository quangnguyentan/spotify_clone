import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { clerkMiddleware } from '@clerk/express';
import { resolve } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.use(express.json()); // to parse req.body
  app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data
  app.use(express.static('public')); // to serve static files from the 'public' directory
  app.useStaticAssets(resolve(process.cwd(), 'src', 'upload'), {
    prefix: '/upload/',
  });
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Set global prefix for API routes
  app.setGlobalPrefix('api');
  // Middleware for Clerk authentication
  app.use(
    clerkMiddleware({
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
      secretKey: process.env.CLERK_SECRET_KEY!,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
