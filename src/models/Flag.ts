import { Model } from 'objection';

export class Flag extends Model {
  id!: number;
  user_id!: number;        // Admin Level 1 (offender)
  flagged_by!: number;     // Admin Level 2 (who flagged)
  reason!: string;
  resolved!: boolean;

  static get tableName() {
    return 'flags';
  }
}
