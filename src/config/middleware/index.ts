import { Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CustomMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    // req. originalUrl, headers, body etc...
    // console.log("= request =", req)

    // res. req.body, .statusCode, 
    // console.log("= response =", res)
    next()
  }
}
