"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const objection_1 = require("objection");
class Item extends objection_1.Model {
    static get tableName() {
        return 'items';
    }
    static get relationMappings() {
        const { Category } = require('./Category');
        return {
            category: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'items.category_id',
                    to: 'categories.id'
                }
            }
        };
    }
}
exports.Item = Item;
