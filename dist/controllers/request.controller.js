"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flagRequest = exports.getRequests = exports.returnRequest = exports.approveRequest = exports.createRequest = void 0;
const Request_1 = require("../models/Request");
const RequestItem_1 = require("../models/RequestItem");
const Item_1 = require("../models/Item");
const createRequest = async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body;
    try {
        // Create parent request
        const request = await Request_1.Request.query().insert({ user_id: userId });
        for (const { item_id, quantity_requested } of items) {
            const item = await Item_1.Item.query().findById(item_id);
            if (!item || item.quantity < quantity_requested) {
                return res.status(400).json({ error: `Insufficient quantity for item ID ${item_id}` });
            }
            await RequestItem_1.RequestItem.query().insert({
                request_id: request.id,
                item_id,
                quantity_requested,
            });
            // Reserve quantity by reducing it temporarily
            await Item_1.Item.query().findById(item_id).patch({
                quantity: item.quantity - quantity_requested,
            });
        }
        res.status(201).json({ message: 'Request created', request_id: request.id });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Request failed' });
    }
};
exports.createRequest = createRequest;
const approveRequest = async (req, res) => {
    const requestId = req.params.id;
    const request = await Request_1.Request.query().findById(requestId);
    if (!request)
        return res.status(404).json({ error: 'Request not found' });
    if (request.status !== 'pending')
        return res.status(400).json({ error: 'Request already handled' });
    await Request_1.Request.query().findById(requestId).patch({ status: 'approved' });
    res.json({ message: 'Request approved' });
};
exports.approveRequest = approveRequest;
const returnRequest = async (req, res) => {
    const requestId = req.params.id;
    const request = await Request_1.Request.query().findById(requestId);
    if (!request)
        return res.status(404).json({ error: 'Request not found' });
    const items = await RequestItem_1.RequestItem.query().where('request_id', requestId);
    for (const requestItem of items) {
        const item = await Item_1.Item.query().findById(requestItem.item_id);
        if (!item) {
            return res.status(404).json({ error: `Item with ID ${requestItem.item_id} not found` });
        }
        await Item_1.Item.query().findById(item.id).patch({
            quantity: item.quantity + requestItem.quantity_requested,
        });
        await RequestItem_1.RequestItem.query().findById(requestItem.id).patch({
            quantity_returned: requestItem.quantity_requested,
        });
    }
    await Request_1.Request.query().findById(requestId).patch({ status: 'returned' });
    res.json({ message: 'Request marked as returned' });
};
exports.returnRequest = returnRequest;
const getRequests = async (req, res) => {
    const requests = await Request_1.Request.query()
        .withGraphFetched('items')
        .orderBy('created_at', 'desc');
    res.json(requests);
};
exports.getRequests = getRequests;
const flagRequest = async (req, res) => {
    const requestId = req.params.id;
    const request = await Request_1.Request.query().findById(requestId);
    if (!request)
        return res.status(404).json({ error: 'Request not found' });
    if (request.status !== 'pending')
        return res.status(400).json({ error: 'Request already handled' });
    await Request_1.Request.query().findById(requestId).patch({ status: 'flagged' });
    res.json({ message: 'Request flagged for review' });
};
exports.flagRequest = flagRequest;
