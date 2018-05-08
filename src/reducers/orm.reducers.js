import { createReducer } from 'redux-orm';
import orm from '../models/orm';

export const db = createReducer(orm);
