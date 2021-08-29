import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

interface GuardType{
  statusCode: number;
  message: String;
}

@Injectable()
export class CustomGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean>{
    const request = context.switchToHttp().getRequest<Request>();
    if (request.header("Authorization") == "demo") {
      return true
    }else{
      throw new InternalServerErrorException()
    }
  }
}
