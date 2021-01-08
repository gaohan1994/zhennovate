/**
 * @todo sign接口
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:16:37
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-07 14:13:17
 */

import { api } from '@/common/request';

export const register = (params) => api.post(`/user/register`, params);

export const signin = (params) => api.post('/user/signin', params);

export const userActive = (params) =>
  api.get(`/user/active/${params.userId}/${params.code}`);
