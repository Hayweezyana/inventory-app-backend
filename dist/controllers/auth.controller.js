"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const register = async (req, res) => {
    const { username, password, level } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await User_1.User.query().insert({ username, password: hashedPassword, level });
    res.status(201).json(user);
};
exports.register = register;
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User_1.User.query().findOne({ username });
    if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, level: user.level }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
};
exports.login = login;
const listUsers = async (req, res) => {
    const currentUser = req.user; // comes from middleware
    if (!currentUser || currentUser.level !== 2) {
        return res.status(403).json({ message: 'Only level 2 admins can view users' });
    }
    const users = await User_1.User.query().select('id', 'username', 'level', 'created_at');
    return res.json(users);
};
exports.listUsers = listUsers;
