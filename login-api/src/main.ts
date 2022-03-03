import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });

  const PORT = 4000;
  await app.listen(PORT);
  console.log(`Api listening on port ${PORT}`);
}

bootstrap();
