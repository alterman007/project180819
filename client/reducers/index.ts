import { combineReducers, Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import {
  decCount, DecCountAction,
  incCount, IncCountAction,
} from '../actions';
import user, {
  IUserState,
} from './user';

const initCount: number = 0;
const count: Reducer<number, DecCountAction | IncCountAction> = handleActions<number, number>({
  [decCount.toString()]: (state: number, action: DecCountAction): number => state - (action.payload || 1),
  [incCount.toString()]: (state: number, action: IncCountAction): number => state + (action.payload || 1),
}, initCount);

export interface IReduxState {
  count: number;
  user: IUserState;
}
const rootReducers: Reducer<IReduxState> = combineReducers<IReduxState>({
  count,
  user,
});

export default rootReducers;
