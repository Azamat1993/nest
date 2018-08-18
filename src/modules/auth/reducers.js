import * as types from './types';

const initialState = {
  loggedIn: false,
  authInfo: null
}

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      const { payload } = action;
      return Object.assign({}, state, {
        loggedIn: true,
        authInfo: payload
      });
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default auth;
