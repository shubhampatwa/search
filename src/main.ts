import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search/search.module';

async function bootstrap() {
  const app = await NestFactory.create(SearchModule);
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true,
    disableErrorMessages: false,
  }));
  await app.listen(process.env.PORT);
}
bootstrap();
