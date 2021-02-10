import { useEffect, useReducer } from 'react';
import { workshopUpcoming, WorkshopTabKeys } from '../constants';
import { useRequest } from 'ahooks';
import { ResponseCode } from '@/common/config';
import useSignSdk from '@/pages/sign/store/sign-sdk';

const initState = {
  [WorkshopTabKeys.upcoming]: {},
};

const ReducerActions = {
  Receive_Upcoming_List: 'Receive_Upcoming_List',
};

/**
 * program的reducer
 */
function workshopReducer(state, action) {
  switch (action.type) {
    case ReducerActions.Receive_Upcoming_List: {
      return {
        ...state,
        [WorkshopTabKeys.upcoming]: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
}

/**
 * workshop 模块的 hooks
 *
 * @param {*} type
 * @param {*} options
 * @return {*}
 */
function useWorkshopHooks(type, options) {
  // usereducer
  const [state, dispatch] = useReducer(workshopReducer, initState);

  // 获取用户信息
  const { sign } = useSignSdk();

  // 请求 workshopUpcoming 拿到数据后存到 redux 中
  const field = useRequest(workshopUpcoming, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.error_code === ResponseCode.success) {
        dispatch({
          type: ReducerActions.Receive_Upcoming_List,
          payload: result.data,
        });
      }
    },
  });

  // 使用hooks时触发
  useEffect(() => {
    switch (type) {
      case WorkshopTabKeys.upcoming: {
        field.run();
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
    field,
  };
}

export default useWorkshopHooks;

export { workshopReducer };
