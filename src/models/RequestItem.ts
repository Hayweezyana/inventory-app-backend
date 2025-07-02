import { Model } from 'objection';
import { Item } from './Item';

export class RequestItem extends Model {
  id!: number;
  request_id!: number;
  item_id!: number;
  quantity_requested!: number;
  quantity_returned!: number;

  static get tableName() {
    return 'request_items';
  }

  static get relationMappings() {
    const { Request } = require('./Request');
    const { Item } = require('./Item');
    
    return {
      request: {
        relation: Model.BelongsToOneRelation,
        modelClass: Request,
        join: {
          from: 'request_items.request_id',
          to: 'requests.id',
        }
      },
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'request_items.item_id',
          to: 'items.id',
        }
      }
    };
  }
}