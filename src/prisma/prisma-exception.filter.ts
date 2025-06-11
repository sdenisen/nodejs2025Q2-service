import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.NotFoundError)
export class PrismaNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(404).json({
      statusCode: 404,
      message: 'Resource not found',
    });
  }
}
