"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const objection_1 = require("objection");
class Category extends objection_1.Model {
    static get tableName() {
        return 'categories';
    }
    static get relationMappings() {
        const { Item } = require('./Item');
        return {
            items: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Item,
                join: {
                    from: 'categories.id',
                    to: 'items.category_id',
                },
            },
        };
    }
}
exports.Category = Category;
