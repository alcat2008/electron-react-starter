// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, promise, router);

export default function configureStore(initialState: Object | void) {
  return createStore(rootReducer, initialState, enhancer);
}
