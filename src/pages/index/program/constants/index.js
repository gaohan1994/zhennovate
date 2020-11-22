/**
 * @todo program接口
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:16:37
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-11-19 10:57:54
 */

import { api } from '@/common/request';

export const ProgramTabKeys = {
  available: 'available',
  progress: 'progress',
  complete: 'complete',
  save: 'save',
};

export const program = (id) => api.get(`/program/${id}`);

export const availableList = (params) => {
  console.log('params', params);
  return api.get(`/program/available${params ? `/${params._id}` : ''}`);
};