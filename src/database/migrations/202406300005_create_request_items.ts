import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('request_items', table => {
    table.increments('id').primary();
    table.integer('request_id').unsigned().references('id').inTable('requests').onDelete('CASCADE');
    table.integer('item_id').unsigned().references('id').inTable('items').onDelete('CASCADE');
    table.integer('quantity_requested').notNullable();
    table.integer('quantity_returned').defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('request_items');
}
