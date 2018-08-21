import * as types from './types';

export const setHistory = (historyValue) => {
  return {
    type: types.SET_HISTORY,
    payload: historyValue
  }
}
