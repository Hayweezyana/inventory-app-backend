"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flag = void 0;
const objection_1 = require("objection");
class Flag extends objection_1.Model {
    static get tableName() {
        return 'flags';
    }
}
exports.Flag = Flag;
