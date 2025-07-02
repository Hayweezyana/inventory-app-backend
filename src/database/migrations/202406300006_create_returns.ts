import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('returns', table => {
    table.increments('id').primary();
    table.integer('request_item_id').unsigned().references('id').inTable('request_items').onDelete('CASCADE');
    table.integer('returned_by').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.timestamp('returned_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('returns');
}
