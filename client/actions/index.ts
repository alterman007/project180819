import {
  Action,
  BaseAction,
  ActionFunction0,
  ActionFunction1,
  createAction,
} from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

export type IncCountAction = Action<number>;
export const incCount: ActionFunction1<number, IncCountAction> = createAction<number, number>(
  actionTypes.incCount,
  (count: number = 1): number => count,
);

export type DecCountAction = Action<number>;
export const decCount: ActionFunction1<number, IncCountAction> = createAction<number, number>(
  actionTypes.decCount,
  (count: number): number => count,
);

export type IAppStart = BaseAction;
export const appStart: ActionFunction0<IAppStart> = createAction(actionTypes.appStart);
