"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestItem = void 0;
const objection_1 = require("objection");
class RequestItem extends objection_1.Model {
    static get tableName() {
        return 'request_items';
    }
    static get relationMappings() {
        const { Request } = require('./Request');
        const { Item } = require('./Item');
        return {
            request: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Request,
                join: {
                    from: 'request_items.request_id',
                    to: 'requests.id',
                }
            },
            item: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Item,
                join: {
                    from: 'request_items.item_id',
                    to: 'items.id',
                }
            }
        };
    }
}
exports.RequestItem = RequestItem;
