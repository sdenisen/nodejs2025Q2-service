import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { url, query, body } = request;

    return next.handle().pipe(
      tap(() => {
        const statusCode = response.statusCode;
        this.loggingService.log(
          `
${new Date()}
Request: 
    url: ${url} 
    query: ${JSON.stringify(query)} 
    body: ${JSON.stringify(body)} 
Response: 
    statusCode: ${statusCode}
`,
          'INTERCEPTOR',
        );
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
