import { useEffect } from 'react';
import {
  ProgramTabKeys,
  availableList,
  progressList,
  completeList,
  savedList,
} from '../constants';
import { useSelector, useDispatch } from 'react-redux';
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
  Receive_Progress_List: 'Receive_Progress_List',
  Receive_Complete_List: 'Receive_Complete_List',
  Receive_Saved_List: 'Receive_Saved_List',
};

/**
 * program的reducer
 */
export function programReducer(state = initState, action) {
  switch (action.type) {
    case ReducerActions.Receive_Availabel_List: {
      return {
        ...state,
        [ProgramTabKeys.available]: action.payload,
      };
    }

    case ReducerActions.Receive_Progress_List: {
      return {
        ...state,
        [ProgramTabKeys.progress]: action.payload,
      };
    }

    case ReducerActions.Receive_Complete_List: {
      return {
        ...state,
        [ProgramTabKeys.complete]: action.payload,
      };
    }

    case ReducerActions.Receive_Saved_List: {
      return {
        ...state,
        [ProgramTabKeys.save]: action.payload,
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
  const state = useSelector((state) => state.programs);
  const dispatch = useDispatch();
  // const [state, dispatch] = useReducer(programReducer, initState);

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

  // 请求 progressList 拿到数据后存到hooks中
  const fieldProgress = useRequest(progressList, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.error_code === ResponseCode.success) {
        dispatch({
          type: ReducerActions.Receive_Progress_List,
          payload: result.data,
        });
      }
    },
  });

  // 请求 completeList 拿到数据后存到hooks中
  const fieldComplete = useRequest(completeList, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.error_code === ResponseCode.success) {
        dispatch({
          type: ReducerActions.Receive_Complete_List,
          payload: result.data,
        });
      }
    },
  });

  // 请求 savedList 拿到数据后存到hooks中
  const fieldSaved = useRequest(savedList, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.error_code === ResponseCode.success) {
        dispatch({
          type: ReducerActions.Receive_Saved_List,
          payload: result.data,
        });
      }
    },
  });

  // 使用hooks时触发
  useEffect(() => {
    switch (type) {
      // case ProgramTabKeys.available: {
      //   field.run(sign.userinfo);
      //   break;
      // }
      // case ProgramTabKeys.progress: {
      //   fieldProgress.run(sign.userinfo);
      //   break;
      // }
      // case ProgramTabKeys.complete: {
      //   fieldComplete.run(sign.userinfo);
      //   break;
      // }
      // case ProgramTabKeys.save: {
      //   fieldSaved.run(sign.userinfo);
      //   break;
      // }
      default: {
        break;
      }
    }
  }, [type, options, sign]);

  const fields = {
    [ProgramTabKeys.available]: field,
    [ProgramTabKeys.complete]: fieldComplete,
    [ProgramTabKeys.progress]: fieldProgress,
    [ProgramTabKeys.save]: fieldSaved,
  };

  const getCurrentFields = (currentTab) => {
    return fields[currentTab] || {};
  };

  return {
    state,
    dispatch,
    list: state[type],
    field,
    fieldProgress,
    fieldComplete,
    fieldSaved,
    fields: fields || {},
    currentFields: fields[type],
    getCurrentFields,
  };
}

export default useProgramHooks;
