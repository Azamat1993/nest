import * as types from './types';

const initialState = {
  devices: []
}

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_DEVICES:
      return Object.assign({}, state, {
        devices: action.payload
      })
    default:
      return state;
  }
}

export default auth;
