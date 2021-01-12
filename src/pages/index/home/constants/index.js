/**
 * home 页面接口
 * @Author: centerm.gaohan
 * @Date: 2020-12-22 13:55:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-11 16:24:43
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
export const checkEnd = (params, payload) => {
  return api.post(`/checkin/end/${params.userId}`, payload);
};

// renewactionplan 重新设置周目标
export const renewactionplan = (params) => {
  return api.get(`/user/renewactionplan/${params.userId}/${params.count}`);
};

// homeInprogress 首页的进度中的program
export const homeInprogress = (params) => {
  return api.get(`/home/inprogress/${params.userId}`);
};
