import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: false
  }));
  // CORS
  app.enableCors({
    credentials: true,
    origin: '*', // ['http://localhost:4200','http://localhost:8100']
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
