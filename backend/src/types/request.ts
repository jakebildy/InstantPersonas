import { Request } from 'express';
import { UserI } from '../models/user.model';

export interface RequestI extends Request {
  user?: UserI;
  rawBody?: string;
}