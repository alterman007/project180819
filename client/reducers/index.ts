import { Reducer, ReducersMapObject } from 'redux';
import { handleActions } from 'redux-actions';
import {
  decCount, DecCountAction,
  incCount, IncCountAction,
} from '../actions';

const initCount: number = 0;
const count: Reducer<number, DecCountAction | IncCountAction> = handleActions<number, number>({
  [decCount.toString()]: (state: number, action: DecCountAction): number => state - (action.payload || 1),
  [incCount.toString()]: (state: number, action: IncCountAction): number => state + (action.payload || 1),
}, initCount);

export interface IReduxState {
  count: number;
}

const rootReducers: ReducersMapObject<IReduxState> = {
  count,
};

export default rootReducers;
