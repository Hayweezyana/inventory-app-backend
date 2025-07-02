"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listReturns = exports.returnItem = void 0;
const Return_1 = require("../models/Return");
const RequestItem_1 = require("../models/RequestItem");
const Item_1 = require("../models/Item");
const returnItem = async (req, res) => {
    const { request_item_id, quantity } = req.body;
    const userId = req.user.id;
    const requestItem = await RequestItem_1.RequestItem.query().findById(request_item_id);
    if (!requestItem)
        return res.status(404).json({ error: 'Request item not found' });
    const alreadyReturned = requestItem.quantity_returned || 0;
    const maxReturnable = requestItem.quantity_requested - alreadyReturned;
    if (quantity > maxReturnable) {
        return res.status(400).json({ error: `Cannot return more than ${maxReturnable}` });
    }
    // Insert return record
    await Return_1.Return.query().insert({
        request_item_id,
        returned_by: userId,
        quantity,
    });
    // Update item stock
    const item = await Item_1.Item.query().findById(requestItem.item_id);
    if (!item)
        return res.status(404).json({ error: 'Item not found' });
    await Item_1.Item.query().findById(requestItem.item_id).patch({
        quantity: item.quantity + quantity
    });
    // Update quantity_returned
    await RequestItem_1.RequestItem.query().findById(request_item_id).patch({
        quantity_returned: alreadyReturned + quantity,
    });
    res.json({ message: 'Item returned successfully' });
};
exports.returnItem = returnItem;
const listReturns = async (req, res) => {
    const returns = await Return_1.Return.query().withGraphFetched('requestItem.item').orderBy('created_at', 'desc');
    res.json(returns);
};
exports.listReturns = listReturns;
