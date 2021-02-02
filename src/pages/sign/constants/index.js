/**
 * @todo sign接口
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:16:37
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-02 12:18:31
 */

import { api } from '@/common/request';

export const register = (params) => api.post(`/user/register`, params);

export const signin = (params) => api.post('/user/signin', params);

export const userActive = (params) =>
  api.get(`/user/active/${params.userId}/${params.code}`);

export const userActiveInfo = (params, payload) =>
  api.post(`/user/info/${params.userId}`, payload);

export const forgotEmail = (params) => api.get(`/user/forgot/${params.email}`);

export const resetPassword = (params) =>
  api.get(`/user/resetpassword/${params.forgotId}/${params.password}`);
