"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function seed(knex) {
    await knex('users').del();
    const password = await bcrypt_1.default.hash('password123', 10);
    await knex('users').insert([
        { username: 'level1_user', password, level: 1 },
        { username: 'level2_admin', password, level: 2 },
    ]);
}
