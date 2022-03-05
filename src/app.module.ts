import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApisModule } from './apis/apis.module';
import { CustomMiddleware } from './common/middleware';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOpts } from './config/database';
import { join } from 'path/posix';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOpts),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      envFilePath: `.env${process.env.NODE_ENV === "development" ? "" : ".production"} `
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema/schema.gql"),
    }),
    ApisModule,
  ],
})

// Middleware使用
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CustomMiddleware).exclude(
    ).forRoutes("/apis");
  }
}