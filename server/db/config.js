
import mssql from 'mssql';
import 'dotenv/config.js';  

const dbconfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

let poolPromist;


async function getPool() {
    if (!poolPromist) {
        try{
            poolPromist = mssql.connect(dbconfig);
            console.log("Database connected successfully");
        }catch (error) {
            console.error("Database connection failed:", error);
        }
    }
    return poolPromist;
}


await getPool();

export {mssql, getPool};