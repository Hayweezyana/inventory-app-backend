# Inventory App Backend

This backend powers an inventory system with two admin levels:
- Level 1: Can request items
- Level 2: Can stock, approve, verify returns, and flag users

## 🔧 Setup Instructions

1. Clone the repo
2. Create `.env` from `.env.example`
3. Run:
   ```bash
   npm install
   npx knex migrate:latest
   npx knex seed:run
   npm run dev
