import { useEffect, useReducer } from 'react';
import { ProgramTabKeys, availableList } from '../constants';
import { useRequest } from 'ahooks';
import { ResponseCode } from '@/common/config';
import useSignSdk from '@/pages/sign/store/sign-sdk';

const initState = {
  [ProgramTabKeys.available]: {},
  [ProgramTabKeys.progress]: {},
  [ProgramTabKeys.complete]: {},
  [ProgramTabKeys.save]: {},
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
        [ProgramTabKeys.available]: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
}

/**
 * program模块的hooks
 */
function useProgramHooks(type, options) {
  // usereducer
  const [state, dispatch] = useReducer(programReducer, initState);

  // 获取用户信息
  const { sign } = useSignSdk();

  // 请求availableList 拿到数据后存到hooks中
  const field = useRequest(availableList, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.error_code === ResponseCode.success) {
        dispatch({
          type: ReducerActions.Receive_Availabel_List,
          payload: result.data,
        });
      }
    },
  });

  // 请求availableList 拿到数据后存到hooks中
  const fieldUsers = useRequest(availableList, {
    manual: true,
    onSuccess: (result, params) => {
      console.log('result', result);
      return;
    },
  });

  // 使用hooks时触发
  useEffect(() => {
    console.log('sign', sign);
    switch (type) {
      case ProgramTabKeys.available: {
        field.run();
        break;
      }
      case ProgramTabKeys.complete: {
        fieldUsers.run(sign.userinfo);
        break;
      }
      default: {
        break;
      }
    }
  }, [type, options, sign]);

  return {
    state,
    dispatch,
    list: state[type],
  };
}

export default useProgramHooks;

export { programReducer };
