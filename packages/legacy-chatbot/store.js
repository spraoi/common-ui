import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

export default (reducers, sagasArray) => {
  function* sagas() {
    yield all(sagasArray);
  }

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devToolsCompose || compose;
  const appliedMiddleware = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(combineReducers(reducers), {}, appliedMiddleware);
  sagaMiddleware.run(sagas);
  return store;
};
