"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const return_controller_1 = require("../controllers/return.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.post('/', (0, auth_1.authorize)(2), return_controller_1.returnItem); // Level 2 verifies returns
exports.default = router;
