import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();


const pool=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.PORTDATABASE,
    ssl:{
        mode:'REQUIRED',
        ca: process.env.CA,
        rejectUnauthorized: false 
    }
})

export default pool