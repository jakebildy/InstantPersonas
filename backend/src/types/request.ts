import { Request } from 'express';
import { UserI } from '../../../next/database/models/user.model';

export interface RequestI extends Request {
  user?: UserI;
  rawBody?: string;
}