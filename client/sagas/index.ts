import { Effect } from 'redux-saga';
import { all } from 'redux-saga/effects';
import login from './login';
import logger from './logger';

const AllForks: Effect[] = [
  login,
];
// console.log('process.env', process.env);

// if (process.env.NODE_ENV === 'development') {
//   AllForks.unshift(logger);
// }
AllForks.unshift(logger);

// console.log('development', AllForks);

export default function* root() {
  yield all(AllForks);
}
