import * as types from './types';

export const setDevices = (data) => {
  return {
    type: types.SET_DEVICES,
    payload: data.devices
  }
}

export const setDeviceProp = (data) => {
  return {
    type: types.SET_DEVICE_PROP,
    payload: data
  }
}