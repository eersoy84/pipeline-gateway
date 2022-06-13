import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Pipeline-Gateway')
    .setDescription('Entry Point For HTTP/Kafka Pipeline Gateway')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(5000, () => {
    logger.verbose(`Pipeline Gateway is listening on port ${port}...`);
  });
}
bootstrap();
