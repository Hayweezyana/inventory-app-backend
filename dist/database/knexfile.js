"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const pg_connection_string_1 = require("pg-connection-string");
dotenv_1.default.config();
const dbConfig = (0, pg_connection_string_1.parse)(process.env.DATABASE_URL || '');
console.log('[DB HOST]', dbConfig.host);
const config = {
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
            directory: path_1.default.resolve(__dirname, 'migrations'),
        },
        seeds: {
            directory: path_1.default.resolve(__dirname, 'seeds'),
        },
    },
};
exports.default = config;
