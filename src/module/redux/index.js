import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { paperformModal } from '@/component/paperform-modal/store';

export const reducer = combineReducers({
  paperformModal,
});

const configureStore = () => {
  const store =
    process.env.NODE_ENV === 'prodcution'
      ? createStore(reducer)
      : createStore(reducer, compose(applyMiddleware(logger)));

  return store;
};

export const store = configureStore();

export default store;
