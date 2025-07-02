"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegister = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.get('/users', auth_1.authenticate, (0, auth_1.authorize)(2), auth_controller_1.listUsers);
router.post('/users', auth_1.authenticate, (0, auth_1.authorize)(2), async (req, res) => {
    const { username, password, level } = req.body;
    const currentUser = req.user;
    if (!currentUser || currentUser.level !== 2) {
        return res.status(403).json({ message: 'Only level 2 admins can create users' });
    }
    const existing = await User_1.User.query().
        findOne({ username });
    if (existing)
        return res.status(400).json({ message: 'Username already exists' });
    const hashed = await bcrypt_1.default.hash(password, 10);
    await User_1.User.query().insert({ username, password: hashed, level });
    res.status(201).json({ message: 'User created successfully' });
});
const adminRegister = async (req, res) => {
    const { username, password, level } = req.body;
    const currentUser = req.user;
    if (!currentUser || currentUser.level !== 2) {
        return res.status(403).json({ message: 'Only level 2 admins can create users' });
    }
    const existing = await User_1.User.query().findOne({ username });
    if (existing)
        return res.status(400).json({ message: 'Username already exists' });
    const hashed = await bcrypt_1.default.hash(password, 10);
    await User_1.User.query().insert({ username, password: hashed, level });
    res.status(201).json({ message: 'User created successfully' });
};
exports.adminRegister = adminRegister;
exports.default = router;
