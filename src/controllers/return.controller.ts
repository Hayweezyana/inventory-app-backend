import { Request, Response } from 'express';
import { Return } from '../models/Return';
import { RequestItem } from '../models/RequestItem';
import { Item } from '../models/Item';

export const returnItem = async (req: any, res: Response) => {
  const { request_item_id, quantity } = req.body;
  const userId = req.user.id;

  const requestItem = await RequestItem.query().findById(request_item_id);
  if (!requestItem) return res.status(404).json({ error: 'Request item not found' });

  const alreadyReturned = requestItem.quantity_returned || 0;
  const maxReturnable = requestItem.quantity_requested - alreadyReturned;

  if (quantity > maxReturnable) {
    return res.status(400).json({ error: `Cannot return more than ${maxReturnable}` });
  }

  // Insert return record
  await Return.query().insert({
    request_item_id,
    returned_by: userId,
    quantity,
  });

  // Update item stock
  const item = await Item.query().findById(requestItem.item_id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  await Item.query().findById(requestItem.item_id).patch({
    quantity: item.quantity + quantity
  });

  // Update quantity_returned
  await RequestItem.query().findById(request_item_id).patch({
    quantity_returned: alreadyReturned + quantity,
  });

  res.json({ message: 'Item returned successfully' });
};
export const listReturns = async (req: Request, res: Response) => {
  const returns = await Return.query().withGraphFetched('requestItem.item').orderBy('created_at', 'desc');
  res.json(returns);
};