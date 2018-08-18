import * as types from './types';

const initialState = {
  devices: [],
  currentDevice: null
}

const devicesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_DEVICES:
      return Object.assign({}, state, {
        devices: action.payload
      });
    case types.SET_DEVICE:
      return Object.assign({}, state, {
        currentDevice: action.payload
      });
    default:
      return state;
  }
}

export default devicesReducer;
