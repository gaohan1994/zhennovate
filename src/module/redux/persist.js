/**
 * 加入持久化
 * @Author: centerm.gaohan
 * @Date: 2020-11-17 15:30:18
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-22 11:59:45
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { reducer } from './index';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['signBlack'],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares =
  process.env.NODE_ENV === 'prodcution'
    ? applyMiddleware(thunk)
    : applyMiddleware(logger, thunk);

const store = createStore(persistedReducer, composeEnhancers(middlewares));
const persistor = persistStore(store);

export { store, persistor };
