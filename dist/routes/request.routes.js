"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_controller_1 = require("../controllers/request.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.post('/', (0, auth_1.authorize)(1), request_controller_1.createRequest);
router.get('/', (0, auth_1.authorize)(2), request_controller_1.getRequests);
router.put('/:id/approve', (0, auth_1.authorize)(2), request_controller_1.approveRequest);
router.put('/:id/return', (0, auth_1.authorize)(2), request_controller_1.returnRequest);
exports.default = router;
