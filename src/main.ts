import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { PrismaNotFoundExceptionFilter } from './prisma/prisma-exception.filter';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { LoggingService } from './logging/logging.service';
import { AllExceptionsFilter } from './common/all-exceptions-filter';

const readApiYaml = async () => {
  const dstPath = resolve(__dirname, '..', 'doc', 'api.yaml');
  return await readFile(dstPath, 'utf-8');
};

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  const logger = new LoggingService();

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(
      `Unhandled Rejection at: ${JSON.stringify(promise)}, reason: ${reason}`,
    );
  });

  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception thrown: ${err}`);
  });

  const apiConfig = await readApiYaml();
  const document = load(apiConfig) as OpenAPIObject;
  SwaggerModule.setup('/doc', app, document);
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggingService()));
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  await app.listen(PORT);
}

bootstrap();
