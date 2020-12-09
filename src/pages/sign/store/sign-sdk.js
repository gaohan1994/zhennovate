import { store } from '@/module/redux/persist';
import { Action_Types } from './sign-store';
import { signin } from '../constants';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';
import invariant from 'invariant';
import { ResponseCode } from '@/common/config';
import { useSelector } from 'react-redux';

function useSignSdk() {
  const history = useHistory();
  const sign = useSelector((state) => state.sign);

  // 是否登录
  const isSign = sign.userinfo && sign.userinfo._id;
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

  const userLogout = (callback) => {
    store.dispatch({
      type: Action_Types.Receive_Userinfo,
      payload: {},
    });

    if (callback) {
      callback();
    }
  };

  const checkSign = (callback) => {
    if (!isSign) {
      history.push(`/sign/signup`);
      return;
    }
    callback && callback();
  };

  return {
    userSignin,
    checkSign,
    userLogout,
    sign,
    isSign,
    userId: (sign.userinfo && sign.userinfo._id) || '',
  };
}

export default useSignSdk;
