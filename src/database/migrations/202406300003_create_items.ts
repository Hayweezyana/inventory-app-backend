import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('quantity').notNullable().defaultTo(0);
    table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('items');
}
