import {createEpicMiddleware} from 'redux-observable';
import {createStore, applyMiddleware} from 'redux';
import {Observable} from 'rxjs';
import {throttleTime} from 'rxjs/operators';

import rootEpic from '../epics';
import reducers from '../reducers';
import Storage from './Storage';

const Store = (function () {
    let instance;
    let observer$;

    const getInstance = () => {
        if (!instance) {
            const epicMiddleware = createEpicMiddleware();
            instance = createStore(reducers, getInitialState(), applyMiddleware(epicMiddleware));
            epicMiddleware.run(rootEpic);
        }
        return instance;
    }

    const asObservable = () => {
        if (!instance) {
            getInstance();
        }

        if (!observer$) {
            observer$ = Observable.create((observer) => {
                try {
                    instance.subscribe(() => {
                        observer.next(instance.getState());
                    });
                } catch (err) {
                    observer.error(err);
                }
            });
        }
        return observer$;
    }

    const getInitialState = () => {
        return Storage.getStore();
    }

    asObservable()
        .pipe(
            throttleTime(1000),
        )
        .subscribe((storeState) => {
            Storage.setStore(storeState);
        });

    return {
        getInstance,
        getInitialState,
        asObservable
    }
}());

export default Store;
