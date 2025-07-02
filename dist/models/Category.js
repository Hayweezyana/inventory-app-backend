"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const objection_1 = require("objection");
class Category extends objection_1.Model {
    static get tableName() {
        return 'categories';
    }
}
exports.Category = Category;
