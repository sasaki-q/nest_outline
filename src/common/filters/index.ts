import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// can catch all exception
// @Catch()
@Catch(HttpException)
export class CustomFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    let message;
    const context = host.switchToHttp()
    const req = context.getRequest<Request>()
    const res = context.getResponse<Response>()
    const status = exception.getStatus()

    switch(status){
        case 401:
          message = "Unauthorized"
        case 403:
          message = "Forbidden"
          break;
        case 404:
          message = "Not Found"
          break;
        case 500:
          message = "internal Server Error"
          break;
    }

    res.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toString()
    })
  }
}
