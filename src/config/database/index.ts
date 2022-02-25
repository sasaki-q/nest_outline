import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Todo } from "src/apis/todo/entity";
import { User } from "src/apis/user/entity";
require('dotenv').config();

export const typeOrmOpts: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: process.env.USERNAME,
    password: process.env.PASS,
    database: process.env.DATABASE,
    entities: [User, Todo],
    synchronize: false,
}