"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// db.ts or knex.ts
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./src/database/knexfile"));
const env = process.env.NODE_ENV || 'development';
const db = (0, knex_1.default)(knexfile_1.default[env]);
exports.default = db;
