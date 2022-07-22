import { Pool } from 'pg';
import dotenv from 'dotenv';

// Import dotenv file
dotenv.config();

const {
    ENV,
    PORT,
    HOST,
    DATABASE,
    USER,
    PASSWORD
} = process.env;

export const client = new Pool({
    host: HOST,
    database: DATABASE,
    user: USER,
    password: PASSWORD
})