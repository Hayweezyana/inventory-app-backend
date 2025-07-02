import type { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';
import { parse } from 'pg-connection-string';

dotenv.config();

const dbConfig = parse(process.env.DATABASE_URL || '');

console.log('[DB HOST]', dbConfig.host);



const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: dbConfig.host ?? undefined,
      port: dbConfig.port ? parseInt(dbConfig.port) : 5432,
      database: dbConfig.database ?? undefined,
      user: dbConfig.user,
      password: dbConfig.password,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'seeds'),
    },
  },
};

export default knexConfig;
