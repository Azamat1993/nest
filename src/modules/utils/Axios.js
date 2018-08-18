import axios from 'axios';
import { tap, map, distinctUntilChanged } from 'rxjs/operators';

import Store from './Store';

var Axios = (function(){
  let prevAccessToken;

  const setAccessToken = (token) => {
    axios.defaults.headers.common['Authorization'] =  `Bearer ${token}`;
  }

  const setInitialAccessToken = () => {
    const initialState = Store.getInitialState();
    const access_token = getAccessTokenFromState(initialState);
    if (access_token) {
      setAccessToken(access_token);
    }
  }

  setInitialAccessToken();

  function getAccessTokenFromState (store) {
    if (store && store.auth && store.auth.authInfo) {
      return store.auth.authInfo.access_token;
    }
  }

  Store.asObservable()
    .pipe(
      map((storeState) => getAccessTokenFromState(storeState)),
      distinctUntilChanged(),
      tap((access_token) => {
        setAccessToken(access_token);
      })
    ).subscribe();
}());

export default Axios;
