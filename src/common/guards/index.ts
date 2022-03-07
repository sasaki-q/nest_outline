import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class CustomGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean>{
    const request = context.switchToHttp().getRequest<Request>();
    if (request.header("authorization") == "demo") {
      return true
    }else{
      throw new UnauthorizedException()
    }
  }
}
