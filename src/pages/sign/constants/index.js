/**
 * @todo sign接口
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:16:37
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 11:49:23
 */

import { api } from '@/common/request';

export const register = (params) => api.post(`/user/register`, params);
