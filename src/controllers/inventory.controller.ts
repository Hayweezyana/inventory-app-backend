import { Request, Response } from 'express';
import { Item } from '../models/Item';
import { Category } from '../models/Category';

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const exists = await Category.query().findOne({ name });
  if (exists) return res.status(400).json({ error: 'Category already exists' });

  const category = await Category.query().insert({ name });
  res.status(201).json(category);
};

export const stockItem = async (req: Request, res: Response) => {
  const { name, quantity, category_id } = req.body;

  const item = await Item.query().findOne({ name, category_id });

  if (item) {
    // Update quantity
    const updated = await Item.query().patchAndFetchById(item.id, {
      quantity: item.quantity + quantity
    });
    return res.json(updated);
  }

  const newItem = await Item.query().insert({ name, quantity, category_id });
  res.status(201).json(newItem);
};

export const listInventory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.query().withGraphFetched('items');
    res.json({ categories }); // <-- wrap in object
  } catch (err) {
    console.error('Failed to list inventory:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


  // const inventory = await Promise.all(categories.map(async (category) => {
  //   const items = await Item.query().where('category_id', category.id);
  //   return {
  //     category: category.name,
  //     items
  //   };
  // }));

  // res.json(inventory);
export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  const item = await Item.query().findById(id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  await Item.query().deleteById(id);
  res.json({ message: 'Item deleted successfully' });
};

export const bulkUploadInventory = async (req: any, res: Response) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid items format' });
  }

  try {
    const inserted = await Item.query().insert(items); // Objection.js bulk insert
    res.status(201).json({ message: 'Items inserted', count: inserted.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to insert items' });
  }
};

