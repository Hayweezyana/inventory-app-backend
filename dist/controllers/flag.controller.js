"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFlag = exports.getFlags = exports.createFlag = void 0;
const Flag_1 = require("../models/Flag");
const createFlag = async (req, res) => {
    const flagged_by = req.user.id;
    const { user_id, reason } = req.body;
    if (flagged_by === user_id)
        return res.status(400).json({ error: 'Cannot flag yourself' });
    const flag = await Flag_1.Flag.query().insert({ user_id, flagged_by, reason });
    res.status(201).json({ message: 'User flagged', flag });
};
exports.createFlag = createFlag;
const getFlags = async (req, res) => {
    const flags = await Flag_1.Flag.query().orderBy('created_at', 'desc');
    res.json(flags);
};
exports.getFlags = getFlags;
const resolveFlag = async (req, res) => {
    const { id } = req.params;
    const updated = await Flag_1.Flag.query().findById(id).patch({ resolved: true });
    res.json({ message: 'Flag resolved', updated });
};
exports.resolveFlag = resolveFlag;
