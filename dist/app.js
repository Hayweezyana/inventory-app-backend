"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const objection_1 = require("objection");
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./database/knexfile"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const inventory_routes_1 = __importDefault(require("./routes/inventory.routes"));
const request_routes_1 = __importDefault(require("./routes/request.routes"));
const flag_routes_1 = __importDefault(require("./routes/flag.routes"));
const return_routes_1 = __importDefault(require("./routes/return.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect Objection to Knex
const db = (0, knex_1.default)(knexfile_1.default[process.env.NODE_ENV || 'development']);
objection_1.Model.knex(db);
// API routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/inventory', inventory_routes_1.default);
app.use('/api/requests', request_routes_1.default);
app.use('/api/flags', flag_routes_1.default);
app.use('/api/returns', return_routes_1.default);
// Root route
app.get('/', (req, res) => res.send('Inventory App API'));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
