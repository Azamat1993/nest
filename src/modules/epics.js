import { combineEpics } from 'redux-observable';
import authEpic from './auth/epics';
import getDataEoic from './home/epics';

export default combineEpics(
  authEpic,
  getDataEoic
)
