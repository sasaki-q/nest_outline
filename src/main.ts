import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomFilter } from './config/filters';
import { CustomGuard } from './config/guards';
import { CustomInterceptor } from './config/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,);
  
  app.useGlobalGuards(new CustomGuard());
  app.useGlobalFilters(new CustomFilter());
  app.useGlobalInterceptors(new CustomInterceptor());
  
  await app.listen(3000);
}
bootstrap();
