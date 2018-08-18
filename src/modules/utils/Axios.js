import axios from 'axios';
import { tap, map, distinctUntilChanged } from 'rxjs/operators';

import Store from './Store';

var Axios = (function(){
  let prevAccessToken;

  const setAccessToken = (token) => {
    axios.defaults.headers.common['Authorization'] =  `Bearer ${token}`;
  }

  const getAccessTokenFromState = (store) => {
    if (store && store.auth && store.auth.authInfo) {
      return store.auth.authInfo.access_token;
    }
  }

  const setInitialAccessToken = () => {
    const initialState = Store.getInitialState();
    const access_token = getAccessTokenFromState(initialState);
    if (access_token) {
      setAccessToken(access_token);
    }
  }

  const initialize = () => {
    axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://developer-api.nest.com';
    setInitialAccessToken();
  }

  Store.asObservable()
    .pipe(
      map((storeState) => getAccessTokenFromState(storeState)),
      distinctUntilChanged(),
      tap((access_token) => {
        setAccessToken(access_token);
      })
    ).subscribe();

  initialize();
}());

export default Axios;
