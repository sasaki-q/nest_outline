import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class GraphqlGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context)
    const req: Request = ctx.getContext().req;
    if(req.header("authorization") === "graphql"){
      return true
    }
    throw new UnauthorizedException()
  }
}
