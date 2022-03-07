import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class GraphqlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req
    return next.handle().pipe(
      tap(() => {
        const res: Response = ctx.getContext().res;
        console.log("Http Response Interceptor === ", Date.now() - now)
      }) 
    );
  }
}
