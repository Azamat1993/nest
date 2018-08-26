import axios from 'axios';
import { combineEpics } from 'redux-observable';
import { switchMap, map, debounceTime, ignoreElements  } from 'rxjs/operators';
import { from } from 'rxjs';
import * as types from './types';

const setDevicePropEpic = action$ =>
  action$
  .ofType(types.SET_DEVICE_PROP)
  .pipe(
    debounceTime(1000),
    switchMap(({payload}) => {
      return from(axios.put(`/devices/thermostats/${payload.device_id}`, payload.putObj))
        .pipe(map(res => ({
          type: types.SET_DEVICE_PROP
        })));
    }),
    ignoreElements ()
  )

export default combineEpics(
  setDevicePropEpic
)
