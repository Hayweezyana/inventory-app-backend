import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  const password = await bcrypt.hash('password123', 10);

  await knex('users').insert([
    { username: 'level1_user', password, level: 1 },
    { username: 'level2_admin', password, level: 2 },
  ]);
}
