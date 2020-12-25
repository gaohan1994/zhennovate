/**
 * home 页面接口
 * @Author: centerm.gaohan
 * @Date: 2020-12-22 13:55:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-24 11:46:36
 */
import { api } from '@/common/request';

export const doingaction = (params) => {
  return api.get(`/user/doingaction/${params.userId}`);
};

export const checkin = (params) => {
  return api.post(`/checkin/${params.userId}`);
};
