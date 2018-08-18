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

export default combineEpics(
  getDevicesEpic
)
