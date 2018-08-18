import * as types from './types';

export const requestDevices = () => {
  return {
    type: types.REQUEST_DEVICES
  }
}

export const setDevices = (data) => {
  return {
    type: types.SET_DEVICES,
    payload: data.devices
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
