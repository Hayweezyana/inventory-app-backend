"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkUploadInventory = exports.deleteItem = exports.listInventory = exports.stockItem = exports.createCategory = void 0;
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
    try {
        const categories = await Category_1.Category.query().withGraphFetched('items');
        res.json({ categories }); // <-- wrap in object
    }
    catch (err) {
        console.error('Failed to list inventory:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.listInventory = listInventory;
// const inventory = await Promise.all(categories.map(async (category) => {
//   const items = await Item.query().where('category_id', category.id);
//   return {
//     category: category.name,
//     items
//   };
// }));
// res.json(inventory);
const deleteItem = async (req, res) => {
    const { id } = req.params;
    const item = await Item_1.Item.query().findById(id);
    if (!item)
        return res.status(404).json({ error: 'Item not found' });
    await Item_1.Item.query().deleteById(id);
    res.json({ message: 'Item deleted successfully' });
};
exports.deleteItem = deleteItem;
const bulkUploadInventory = async (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items)) {
        return res.status(400).json({ error: 'Invalid items format' });
    }
    try {
        const inserted = await Item_1.Item.query().insert(items); // Objection.js bulk insert
        res.status(201).json({ message: 'Items inserted', count: inserted.length });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert items' });
    }
};
exports.bulkUploadInventory = bulkUploadInventory;
