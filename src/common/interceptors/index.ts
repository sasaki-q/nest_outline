import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from "express";

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        const res = http.getResponse<Response>();
        console.log("= return http response =", Date.now() - now)
      })
    );
  }
}
