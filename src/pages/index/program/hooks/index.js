import { useEffect, useReducer } from 'react';
import { ProgramTabKeys, availableList } from '../constants';
import { useRequest } from 'ahooks';

const initState = {
  availabelList: [],
};

const ReducerActions = {
  Receive_Availabel_List: 'Receive_Availabel_List',
};

/**
 * program的reducer
 */
function programReducer(state, action) {
  switch (action.type) {
    case ReducerActions.Receive_Availabel_List: {
      return {
        ...state,
      };
    }
    default: {
      return {};
    }
  }
}

/**
 * program模块的hooks
 */
function useProgramHooks(key, params) {
  const [state, dispatch] = useReducer(programReducer, initState);

  const result = useRequest(availableList, { manual: true });
  console.log('result', result);

  useEffect(() => {
    switch (key) {
      case ProgramTabKeys.available: {
        break;
      }
      default: {
        break;
      }
    }
  }, [key, params]);

  return {
    state,
    dispatch,
  };
}

export default useProgramHooks;

export { programReducer };
