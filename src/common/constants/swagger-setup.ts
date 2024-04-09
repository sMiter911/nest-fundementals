import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Nest.js Fundamentals')
  .setDescription('The Nest.js Fundamentals API description')
  .setVersion('1.0')
  .addTag('Nest.js Fundamentals')
  .build();

export const options: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};
