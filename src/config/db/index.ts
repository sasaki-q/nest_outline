import { TypeOrmModuleOptions } from "@nestjs/typeorm";
require('dotenv').config();

export const typeOrmOptions: TypeOrmModuleOptions =  {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.{js,ts}'],
    synchronize: false,
    autoLoadEntities: true,
}