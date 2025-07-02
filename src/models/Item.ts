import { Model } from 'objection';

export class Item extends Model {
  id!: number;
  name!: string;
  quantity!: number;
  category_id!: number;

  static get tableName() {
    return 'items';
  }

  static get relationMappings() {
    const { Category } = require('./Category');
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'items.category_id',
          to: 'categories.id'
        }
      }
    };
  }
}
