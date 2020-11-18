import { store } from '@/module/redux/persist';
import { Action_Types } from './sign-store';
import { signin } from '../constants';
import { notification } from 'antd';
import invariant from 'invariant';
import { ResponseCode } from '@/common/config';
import { useSelector } from 'react-redux';

function useSignSdk() {
  const sign = useSelector((state) => state.sign);
  console.log('sign', sign);
  /**
   * 用户登录
   *
   * @param {*} params
   * @memberof SignSdk
   */
  const userSignin = async (params, callback) => {
    try {
      const result = await signin(params);
      invariant(
        result.error_code === ResponseCode.success,
        result.message || ' ',
      );

      store.dispatch({
        type: Action_Types.Receive_Userinfo,
        payload: result.data,
      });

      if (callback) {
        callback();
      }
    } catch (error) {
      notification.warn({ message: error.message });
    }
  };

  return {
    userSignin,
    sign,
  };
}

export default useSignSdk;
