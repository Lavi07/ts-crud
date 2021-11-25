import mysql from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});
