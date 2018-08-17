import * as types from './types';
import axios from 'axios';

const initialState = {
  loggedIn: false,
  userInfo: null
}

const setAuthToken = (token) => {
  const access_token = `Bearer ${token}`;
  axios.defaults.headers.common['Authorization'] = access_token;
  window.localStorage[`${token ? 'set' : 'remove'}Item`]('access_token', access_token);
}

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      const { payload } = action;
      setAuthToken(payload.access_token);
      return Object.assign({}, state, {
        loggedIn: true,
        userInfo: payload
      });
    case types.LOGOUT:
      setAuthToken(null);
      return initialState;
    default:
      return state;
  }
}

export default auth;
