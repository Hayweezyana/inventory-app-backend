import { Model } from 'objection';

export class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  level!: number;

  static get tableName() {
    return 'users';
  }
}