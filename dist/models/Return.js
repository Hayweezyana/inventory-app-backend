"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const objection_1 = require("objection");
class Return extends objection_1.Model {
    static get tableName() {
        return 'returns';
    }
}
exports.Return = Return;
