import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApisModule } from './apis/apis.module';
import { CustomMiddleware } from './config/middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ApisModule,
    ConfigModule.forRoot({
      envFilePath: `.env${process.env.NODE_ENV == "dev" ? "" : ".production"} `
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.{js,ts}'],
      synchronize: false,
    })
  ],
  controllers: [AppController],
})

// Middleware使用
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CustomMiddleware).forRoutes("/apis")
  }
}