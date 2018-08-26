import {combineEpics} from 'redux-observable';
import * as types from './types';
import {switchMap, map} from 'rxjs/operators';
import {from} from 'rxjs';
import querystring from 'querystring';

import axios from 'axios';

const loginEpic = action$ =>
    action$
        .ofType(types.LOGIN)
        .pipe(
            switchMap((data) => {
                return from(axios.post('https://cors-anywhere.herokuapp.com/https://api.home.nest.com/oauth2/access_token', querystring.stringify({
                    client_id: '82e718d1-1c2c-4dba-9499-ba67eb3bcae5',
                    client_secret: 'lWtlByPvDsY7SkB6bbrr2eBw9',
                    grant_type: 'authorization_code',
                    code: data.payload
                })))
                    .pipe(map((res) => {
                        return {
                            type: types.LOGIN_SUCCESS,
                            payload: res.data
                        }
                    }))
            })
        )

export default combineEpics(
    loginEpic
)
