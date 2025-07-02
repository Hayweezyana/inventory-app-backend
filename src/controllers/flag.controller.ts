import { Request, Response } from 'express';
import { Flag } from '../models/Flag';

export const createFlag = async (req: any, res: Response) => {
  const flagged_by = req.user.id;
  const { user_id, reason } = req.body;

  if (flagged_by === user_id) return res.status(400).json({ error: 'Cannot flag yourself' });

  const flag = await Flag.query().insert({ user_id, flagged_by, reason });
  res.status(201).json({ message: 'User flagged', flag });
};

export const getFlags = async (req: Request, res: Response) => {
  const flags = await Flag.query().orderBy('created_at', 'desc');
  res.json(flags);
};

export const resolveFlag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Flag.query().findById(id).patch({ resolved: true });
  res.json({ message: 'Flag resolved', updated });
};
