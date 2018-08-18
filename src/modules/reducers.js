import { combineReducers } from 'redux';

import auth from './auth/reducers';
import home from './home/reducers'

const reducers = combineReducers({
  auth,
  data: home
});

export default reducers;
