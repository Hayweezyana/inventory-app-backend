"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('requests', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.enum('status', ['pending', 'approved', 'returned', 'flagged']).defaultTo('pending');
        table.timestamps(true, true);
    });
}
async function down(knex) {
    return knex.schema.dropTable('requests');
}
