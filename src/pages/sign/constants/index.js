/**
 * @todo sign接口
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:16:37
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-10 15:40:11
 */

import { api } from '@/common/request';

export const register = (params) => api.post(`/user/register`, params);

export const signin = (params) => api.post('/user/signin', params);

export const userActive = (params) => {
  console.log('params', params);
  return api.get(`/user/active/${params.userId}/${params.code}`);
};

export const verficaCode = (params) => {
  return api.get(`/user/verification/${params.email}`);
};

export const onBoardingStart = (params) => {
  return api.get(`/onboarding/start/${params.userId}`);
};

export const userActiveInfo = (params, payload) =>
  api.post(`/user/info/${params.userId}`, payload);

export const onBoardingEnd = (params, payload) => {
  return api.post(`/onboarding/end/${params.userId}`, payload);
};

export const forgotEmail = (params) => api.get(`/user/forgot/${params.email}`);

export const resetPassword = (params) =>
  api.get(`/user/resetpassword/${params.forgotId}/${params.password}`);

export const isOrganization = (params) => {
  return api.get(`/user/isOrganization/${params.email}`);
};

export const userRegisterV2 = (params) => {
  return api.post('/user/register/v2', params);
};

export const setPassword = (params) => {
  return api.get(
    `/user/setpassword/${params.verificationId}/${params.password}`,
  );
};
