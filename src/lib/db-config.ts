import {drizzle} from 'drizzle-orm/neon-http';
import {config} from 'dotenv';
import { neon } from '@neondatabase/serverless';
config({
    path: '.env.local'
})

const sql = neon(process.env.DB_CONNECTION_STRING!);

export const db = drizzle(sql);