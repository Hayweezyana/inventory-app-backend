"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listInventory = exports.stockItem = exports.createCategory = void 0;
const Item_1 = require("../models/Item");
const Category_1 = require("../models/Category");
const createCategory = async (req, res) => {
    const { name } = req.body;
    const exists = await Category_1.Category.query().findOne({ name });
    if (exists)
        return res.status(400).json({ error: 'Category already exists' });
    const category = await Category_1.Category.query().insert({ name });
    res.status(201).json(category);
};
exports.createCategory = createCategory;
const stockItem = async (req, res) => {
    const { name, quantity, category_id } = req.body;
    const item = await Item_1.Item.query().findOne({ name, category_id });
    if (item) {
        // Update quantity
        const updated = await Item_1.Item.query().patchAndFetchById(item.id, {
            quantity: item.quantity + quantity
        });
        return res.json(updated);
    }
    const newItem = await Item_1.Item.query().insert({ name, quantity, category_id });
    res.status(201).json(newItem);
};
exports.stockItem = stockItem;
const listInventory = async (req, res) => {
    const categories = await Category_1.Category.query().withGraphFetched('items');
    const inventory = await Promise.all(categories.map(async (category) => {
        const items = await Item_1.Item.query().where('category_id', category.id);
        return {
            category: category.name,
            items
        };
    }));
    res.json(inventory);
};
exports.listInventory = listInventory;
