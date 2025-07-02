"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
exports.authenticate = authenticate;
const authorize = (...levels) => {
    return (req, res, next) => {
        if (!req.user || !levels.includes(req.user.level)) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permission' });
        }
        next();
    };
};
exports.authorize = authorize;
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.level !== 1) {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    next();
};
exports.isAdmin = isAdmin;
