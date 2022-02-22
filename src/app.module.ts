import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApisModule } from './apis/apis.module';
import { CustomMiddleware } from './common/middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './config/db';

@Module({
  imports: [
    ApisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      envFilePath: `.env${process.env.NODE_ENV == "dev" ? "" : ".production"} `
    }),
    TypeOrmModule.forRoot(typeOrmOptions),
  ],
})

// Middleware使用
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CustomMiddleware).exclude(
    ).forRoutes("/apis");
  }
}