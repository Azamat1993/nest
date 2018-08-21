import { combineReducers } from 'redux';

import auth from './auth/reducers';
import devices from './home/reducers';
import history from './history/reducers';

const reducers = combineReducers({
  auth,
  devices,
  history
});

export default reducers;
