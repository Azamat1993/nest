import { combineReducers } from 'redux';

import auth from './auth/reducers';
import devices from './home/reducers'

const reducers = combineReducers({
  auth,
  devices
});

export default reducers;
