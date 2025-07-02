import { Request as Req, Response } from 'express';
import { Request as RequestModel } from '../models/Request';
import { RequestItem } from '../models/RequestItem';
import { Item } from '../models/Item';

export const createRequest = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { items } = req.body;

  try {
    // Create parent request
    const request = await RequestModel.query().insert({ user_id: userId });

    for (const { item_id, quantity_requested } of items) {
      const item = await Item.query().findById(item_id);

      if (!item) {
  console.error(`Item with ID ${item_id} not found`);
  return res.status(404).json({ error: `Item with ID ${item_id} not found` });
}

if (item.quantity < quantity_requested) {
  console.error(`Insufficient stock for item ID ${item_id}: requested ${quantity_requested}, available ${item.quantity}`);
  return res.status(400).json({ error: `Insufficient quantity for item ID ${item_id}` });
}


      await RequestItem.query().insert({
        request_id: request.id,
        item_id,
        quantity_requested,
      });

      // Reserve quantity by reducing it temporarily
      await Item.query().findById(item_id).patch({
        quantity: item.quantity - quantity_requested,
      });
    }

    res.status(201).json({ message: 'Request created', request_id: request.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Request failed' });
  }
};

export const approveRequest = async (req: any, res: Response) => {
  const requestId = req.params.id;
  const request = await RequestModel.query().findById(requestId);

  if (!request) return res.status(404).json({ error: 'Request not found' });
  if (request.status !== 'pending') return res.status(400).json({ error: 'Request already handled' });

  await RequestModel.query().findById(requestId).patch({ status: 'approved' });
  res.json({ message: 'Request approved' });
};

export const returnRequest = async (req: any, res: Response) => {
  const requestId = req.params.id;
  const request = await RequestModel.query().findById(requestId);

  if (!request) return res.status(404).json({ error: 'Request not found' });

  const items = await RequestItem.query().where('request_id', requestId);
  for (const requestItem of items) {
    const item = await Item.query().findById(requestItem.item_id);
    if (!item) {
      return res.status(404).json({ error: `Item with ID ${requestItem.item_id} not found` });
    }
    await Item.query().findById(item.id).patch({
      quantity: item.quantity + requestItem.quantity_requested,
    });

    await RequestItem.query().findById(requestItem.id).patch({
      quantity_returned: requestItem.quantity_requested,
    });
  }

  await RequestModel.query().findById(requestId).patch({ status: 'returned' });
  res.json({ message: 'Request marked as returned' });
};

export const getRequests = async (req: any, res: Response) => {
  const requests = await RequestModel.query()
    .withGraphFetched('[items.item, user]')
    .orderBy('created_at', 'desc');

  res.json(requests);
};
export const flagRequest = async (req: any, res: Response) => {
  const requestId = req.params.id;
  const request = await RequestModel.query().findById(requestId);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (request.status !== 'pending') return res.status(400).json({ error: 'Request already handled' });
    await RequestModel.query().findById(requestId).patch({ status: 'flagged' });
    res.json({ message: 'Request flagged for review' });
}