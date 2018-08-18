import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';

import rootEpic from '../epics';
import reducers from '../reducers';
import Storage from './Storage';

const Store = (function(){
  let instance;

  const getInstance = () => {
    if (!instance) {
      const epicMiddleware = createEpicMiddleware();
      instance = createStore(reducers, applyMiddleware(epicMiddleware), getInitialState());
      epicMiddleware.run(rootEpic);
    }
    return instance;
  }

  const getInitialState = () => {
    return Storage.getStore();
  }

  return {
    getInstance
  }
}());

export default Store;
