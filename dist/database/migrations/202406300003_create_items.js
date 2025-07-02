"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('quantity').notNullable().defaultTo(0);
        table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
        table.timestamps(true, true);
    });
}
async function down(knex) {
    return knex.schema.dropTable('items');
}
