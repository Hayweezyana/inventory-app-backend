"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('flags', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('flagged_by').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('reason').notNullable();
        table.boolean('resolved').defaultTo(false);
        table.timestamps(true, true);
    });
}
async function down(knex) {
    return knex.schema.dropTable('flags');
}
