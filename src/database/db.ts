// db.ts or knex.ts
import knex from 'knex';
import knexConfig from './src/database/knexfile';

const env = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[env]);

export default db;
