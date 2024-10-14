import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*   const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    app.use('trust proxy', 1);
  } */
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('EduFlex API')
    .setDescription('EduFlex Api Api Description')
    .setVersion('1.0')
    .addTag('docs')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({ credentials: true, origin: true });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
