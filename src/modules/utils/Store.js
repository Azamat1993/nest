import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';

import rootEpic from '../epics';
import reducers from '../reducers';
import Storage from './Storage';

const Store = (function(){
  var instance;

  function getInstance() {
    if (!instance) {
      const epicMiddleware = createEpicMiddleware();
      instance = createStore(reducers, applyMiddleware(epicMiddleware), getInitialState());
      epicMiddleware.run(rootEpic);
    }
    return instance;
  }

  function getInitialState() {

  }

  return {
    getInstance
  }
}());

export default Store;
