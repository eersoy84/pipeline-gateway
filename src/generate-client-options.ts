import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { OpenApiNestFactory } from 'nest-openapi-tools';

export const generateClient = async (app: INestApplication) => {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Pipeline-Gateway')
    .setDescription('Entry Point For HTTP/Kafka Pipeline Gateway')
    .setVersion('1.0')
    .addTag('pipeline-gateway');

  return await OpenApiNestFactory.configure(
    app,
    documentBuilder,
    {
      webServerOptions: {
        enabled: true,
        path: 'api-docs',
      },
      fileGeneratorOptions: {
        enabled: true,
        outputFilePath: './openapi.json', // or ./openapi.json
      },
      clientGeneratorOptions: {
        enabled: false,
        type: 'typescript-axios',
        outputFolderPath: '../typescript-api-client/src',
        additionalProperties:
          'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
        openApiFilePath: './openapi.json', // or ./openapi.json
        skipValidation: true, // optional, false by default
      },
    },
    {
      operationIdFactory: (c: string, method: string) => method,
    },
  );
};
