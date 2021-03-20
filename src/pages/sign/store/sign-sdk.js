import { store } from '@/module/redux/persist';
import { Action_Types, Action_Types_Black_Sign } from './sign-store';
import { signin } from '../constants';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import invariant from 'invariant';
import { ResponseCode } from '@/common/config';
import { useSelector } from 'react-redux';

function useSignSdk() {
  const history = useHistory();
  const sign = useSelector((state) => state.sign);
  const signBlack = useSelector((state) => state.signBlack);

  const rememberToken = sign.rememberToken;

  const isSign = rememberToken
    ? sign.userinfo && sign.userinfo._id
    : signBlack.userinfo && signBlack.userinfo._id;

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

      invariant(
        result.data && result.data !== undefined,
        'Please enter the correct Email and Password',
      );

      store.dispatch({
        type: Action_Types.Receive_Userinfo,
        payload: result.data,
      });

      if (callback) {
        callback();
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const uploadUserinfo = (nextUserinfo) => {
    store.dispatch({
      type: Action_Types.Receive_Userinfo,
      payload: nextUserinfo,
    });
  };

  const userLogout = (callback) => {
    store.dispatch({
      type: Action_Types.Receive_Userinfo,
      payload: {},
    });

    store.dispatch({
      type: Action_Types_Black_Sign.Receive_Userinfo_Black,
      payload: {},
    });

    if (callback) {
      callback();
    }
  };

  const checkSign = (callback, params) => {
    if (!isSign) {
      history.push(
        `/sign/signup${
          params
            ? `?forward_url=${
                typeof params === 'string'
                  ? encodeURIComponent(params)
                  : JSON.stringify(params)
              }`
            : ''
        }`,
      );
      return;
    }
    callback && callback();
  };

  const toggleRememberMe = () => {
    store.dispatch({
      type: Action_Types.Change_Remember_Token,
      payload: {},
    });
  };

  return {
    userSignin,
    checkSign,
    userLogout,
    toggleRememberMe,
    uploadUserinfo,
    sign: rememberToken ? sign : signBlack,
    isSign: isSign,
    userId: rememberToken
      ? (sign.userinfo && sign.userinfo._id) || ''
      : (signBlack.userinfo && signBlack.userinfo._id) || '',
  };
}

export default useSignSdk;
