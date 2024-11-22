import mysql from "mysql2/promise";

export const db = mysql.createConnection({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  password: process.env.DB_Password,
  database: process.env.DB_Name,
  port: '3307'
});
