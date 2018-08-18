import * as types from './types';
import axios from 'axios';

const initialState = {
  loggedIn: false,
  userInfo: null
}

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      const { payload } = action;
      return Object.assign({}, state, {
        loggedIn: true,
        userInfo: payload
      });
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default auth;
