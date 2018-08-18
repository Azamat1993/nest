import axios from 'axios';
import { combineEpics } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
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

export default combineEpics(
  getDevicesEpic,
  getDeviceEpic
)
