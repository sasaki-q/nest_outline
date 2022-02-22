import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomFilter } from './common/filters';
import { CustomGuard } from './common/guards';
import { CustomInterceptor } from './common/interceptors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,);
  
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new CustomGuard());
  app.useGlobalFilters(new CustomFilter());
  app.useGlobalInterceptors(new CustomInterceptor());
  
  await app.listen(3000);
}
bootstrap();
