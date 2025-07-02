"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('request_items', table => {
        table.increments('id').primary();
        table.integer('request_id').unsigned().references('id').inTable('requests').onDelete('CASCADE');
        table.integer('item_id').unsigned().references('id').inTable('items').onDelete('CASCADE');
        table.integer('quantity_requested').notNullable();
        table.integer('quantity_returned').defaultTo(0);
        table.timestamps(true, true);
    });
}
async function down(knex) {
    return knex.schema.dropTable('request_items');
}
