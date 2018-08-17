import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './modules/epics';
import reducers from './modules/reducers';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const epicMiddleware = createEpicMiddleware();

const store = createStore(reducers, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

ReactDOM.render(<Provider store={store}>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
