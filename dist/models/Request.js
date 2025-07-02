"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const objection_1 = require("objection");
class Request extends objection_1.Model {
    static get tableName() {
        return 'requests';
    }
    static get relationMappings() {
        const { User } = require('./User');
        const { RequestItem } = require('./RequestItem');
        return {
            user: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'requests.user_id',
                    to: 'users.id',
                }
            },
            items: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: RequestItem,
                join: {
                    from: 'requests.id',
                    to: 'request_items.request_id',
                }
            }
        };
    }
}
exports.Request = Request;
