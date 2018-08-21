import axios from 'axios';
import { combineEpics } from 'redux-observable';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { from } from 'rxjs';
import * as types from './types';

const getDevicesEpic= action$ =>
  action$
  .ofType(types.REQUEST_DEVICES)
  .pipe(
    switchMap((data) => from(axios.get('/'))
      .pipe(map(res => ({
        type: types.SET_DEVICES,
        payload: res.data.devices
      })))
    )
  );

const getDeviceEpic = action$ =>
  action$
  .ofType(types.REQUEST_DEVICE)
  .pipe(
    switchMap(({payload}) => {
      return from(axios.get(`/devices/${payload.device_type}/${payload.device_id}`))
        .pipe(map(res => ({
          type: types.SET_DEVICE,
          payload: res
        })))
    })
  )

const setDevicePropEpic = action$ =>
  action$
  .ofType(types.SET_DEVICE_PROP)
  .pipe(
    debounceTime(1000),
    switchMap(({payload}) => {
      return from(axios.put(`/devices/thermostats/${payload.device_id}`, payload.putObj));
    })
  )

export default combineEpics(
  getDevicesEpic,
  getDeviceEpic,
  setDevicePropEpic
)
