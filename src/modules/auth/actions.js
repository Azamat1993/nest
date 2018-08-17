import * as types from './types';

export const login = (code) => {
  return {
    type: types.LOGIN,
    payload: code
  }
}

export const logout = () => {
  return {
    type: types.LOGOUT
  }
}
