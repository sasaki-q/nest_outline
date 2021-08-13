import { Pool } from "pg";
require('dotenv').config();

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})