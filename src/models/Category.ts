import { Model } from 'objection';

export class Category extends Model {
  id!: number;
  name!: string;

  static get tableName() {
    return 'categories';
  }

  static get relationMappings() {
    const { Item } = require('./Item');
    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: 'categories.id',
          to: 'items.category_id',
        },
      },
    };
  }

}
