import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Model } from 'objection';
import knex from 'knex';
import knexConfig from './database/knexfile';

import authRoutes from './routes/auth.routes';
import inventoryRoutes from './routes/inventory.routes';
import requestRoutes from './routes/request.routes';
import flagRoutes from './routes/flag.routes';
import returnRoutes from './routes/return.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect Objection to Knex
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
Model.knex(db);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/flags', flagRoutes);
app.use('/api/returns', returnRoutes);

// Root route
app.get('/', (req, res) => res.send('Inventory App API'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
