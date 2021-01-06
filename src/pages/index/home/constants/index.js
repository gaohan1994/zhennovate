/**
 * home 页面接口
 * @Author: centerm.gaohan
 * @Date: 2020-12-22 13:55:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-05 18:46:49
 */
import { api } from '@/common/request';

export const doingaction = (params) => {
  return api.get(`/user/doingaction/${params.userId}`);
};

// 是否checkin
export const checkin = (params) => {
  return api.post(`/checkin/${params.userId}`);
};

// checkin 开始
export const checkStart = (params) => {
  return api.get(`/checkin/start/${params.userId}`);
};

// checkin 结束
export const checkEnd = (params) => {
  return api.post(`/checkin/end/${params.userId}`);
};

// renewactionplan 重新设置周目标
export const renewactionplan = (params) => {
  return api.post(`/user/renewactionplan/${params.userId}/${params.count}`);
};
