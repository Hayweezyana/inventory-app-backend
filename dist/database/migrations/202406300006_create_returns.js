"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('returns', table => {
        table.increments('id').primary();
        table.integer('request_item_id').unsigned().references('id').inTable('request_items').onDelete('CASCADE');
        table.integer('returned_by').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('quantity').notNullable();
        table.timestamp('returned_at').defaultTo(knex.fn.now());
    });
}
async function down(knex) {
    return knex.schema.dropTable('returns');
}
