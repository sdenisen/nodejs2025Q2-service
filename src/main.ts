import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaNotFoundExceptionFilter } from './prisma/prisma-exception.filter';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { LoggingService } from './logging/logging.service';
import { AllExceptionsFilter } from './common/all-exceptions-filter';

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

  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggingService()));
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  await app.listen(PORT);
}

bootstrap();
