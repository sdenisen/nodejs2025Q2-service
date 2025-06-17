import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const request = context.switchToHttp().getRequest();
    // const response = context.switchToHttp().getResponse();

    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const { method, url, query, body } = req;

    this.logger.log(
      `[Request] ${method} ${url} | query: ${JSON.stringify(
        query,
      )} | body: ${JSON.stringify(body)}`,
    );

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;
        const duration = Date.now() - now;
        this.logger.log(
          `[Response] ${method} ${url} | status: ${statusCode} | duration: ${duration}ms`,
        );
      }),
    );
  }
}
