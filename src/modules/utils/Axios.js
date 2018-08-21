import axios from 'axios';
import { tap, map, distinctUntilChanged } from 'rxjs/operators';
import EventSource from 'eventsource';
import { Subject } from 'rxjs';

import Store from './Store';

const NEST_URL = ' https://young-hollows-50284.herokuapp.com/https://developer-api.nest.com';

var Axios = (function(){
  const eventStream = new Subject();
  let source;

  const initializeEventStream = (token) => {
    const headers = {
      "Authorization" : token
    };

    if (!source) {
      source = new EventSource(NEST_URL, {"headers": headers});

      source.addEventListener('put', (event) => {
        eventStream.next(JSON.parse(event.data).data);
      });

      source.addEventListener('open', () => {
        console.log('connection opened');
      });

      source.addEventListener('auth_revoked', function(event) {
         console.log('Authentication token was revoked.');
         // Re-authenticate your user here.
      });

      source.addEventListener('error', function(event) {
          if (event.readyState === EventSource.CLOSED) {
              console.error('Connection was closed!', event);
          } else {
              console.error('An unknown error occurred: ', event);
          }
      }, false);
    }
  }

  const setAccessToken = (token) => {
    if (token) {
      const access_token = `Bearer ${token}`;
      axios.defaults.headers.common['Authorization'] = access_token;
      initializeEventStream(access_token);
    } else {
      axios.defaults.headers.common['Authorization'] = null;
    }
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
    axios.defaults.baseURL = NEST_URL;
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

  return {
    eventStream
  };
}());

export default Axios;
