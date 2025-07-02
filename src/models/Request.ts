import { Model } from 'objection';

export class Request extends Model {
  id!: number;
  user_id!: number;
  status!: 'pending' | 'approved' | 'returned' | 'flagged';
  created_at!: string;

  static get tableName() {
    return 'requests';
  }

  static get relationMappings() {
    const { User } = require('./User');
    const { RequestItem } = require('./RequestItem');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'requests.user_id',
          to: 'users.id',
        }
      },
      items: {
        relation: Model.HasManyRelation,
        modelClass: RequestItem,
        join: {
          from: 'requests.id',
          to: 'request_items.request_id',
        }
      }
    };
  }
}
