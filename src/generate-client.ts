import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateClient } from './generate-client-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await generateClient(app);
}
bootstrap();
