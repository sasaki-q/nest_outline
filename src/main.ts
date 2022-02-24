import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomFilter } from './common/filters';
import { CustomGuard } from './common/guards';
import { CustomInterceptor } from './common/interceptors';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,);

  const opts = new DocumentBuilder()
  .setTitle("swagger auto")
  .build()
  const doc = SwaggerModule.createDocument(app, opts);
  SwaggerModule.setup("swagger", app, doc);

  app.setGlobalPrefix('apis/v1/')
  app.useGlobalGuards(new CustomGuard());
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new CustomFilter());
  app.useGlobalInterceptors(new CustomInterceptor());
  
  await app.listen(3000);
}
bootstrap();
