import { Model } from 'objection';

export class Return extends Model {
  id!: number;
  request_item_id!: number;
  returned_by!: number;
  quantity!: number;

  static get tableName() {
    return 'returns';
  }
}
