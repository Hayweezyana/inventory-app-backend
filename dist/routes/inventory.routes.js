"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventory_controller_1 = require("../controllers/inventory.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_1.authenticate);
// Only Level 2 can stock or create category
router.post('/category', (0, auth_1.authorize)(2), inventory_controller_1.createCategory);
router.post('/stock', (0, auth_1.authorize)(2), inventory_controller_1.stockItem);
router.post('/bulk-upload', auth_1.authenticate, (0, auth_1.authorize)(2), inventory_controller_1.bulkUploadInventory);
// Any level can view inventory
router.get('/', (0, auth_1.authorize)(1, 2), inventory_controller_1.listInventory);
exports.default = router;
