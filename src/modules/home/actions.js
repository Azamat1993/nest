import * as types from './types';

export const requestDevices = () => {
  return {
    type: types.REQUEST_DEVICES
  }
}

export const requestDevice = (device_type, device_id) => {
  return {
    type: types.REQUEST_DEVICE,
    payload: {
      device_type,
      device_id
    }
  }
}
