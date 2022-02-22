import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomFilter } from './common/filters';
import { CustomGuard } from './common/guards';
import { CustomInterceptor } from './common/decorators/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,);
  
  app.useGlobalGuards(new CustomGuard());
  app.useGlobalFilters(new CustomFilter());
  app.useGlobalInterceptors(new CustomInterceptor());
  
  await app.listen(3000);
}
bootstrap();
