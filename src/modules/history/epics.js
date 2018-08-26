import {combineEpics} from 'redux-observable';
import * as types from './types';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

const historyEpic = action$ =>
    action$
        .ofType(types.SET_HISTORY)
        .pipe(
            debounceTime(1000),
            distinctUntilChanged((prev, next) => {
                return JSON.stringify(prev) === JSON.stringify(next);
            }),
            map(res => ({
                type: types.SET_HISTORY_ITEM,
                payload: res.payload
            }))
        );

export default combineEpics(
    historyEpic
)
