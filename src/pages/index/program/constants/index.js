/**
 * @todo program接口
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:16:37
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-24 11:34:55
 */

import { api } from '@/common/request';

export const ProgramTabKeys = {
  available: 'available',
  progress: 'progress',
  complete: 'complete',
  save: 'save',
};

export const ProgramTabTitles = {
  available: 'Available',
  progress: 'In Progress',
  complete: 'Completed',
  save: 'Saved',
};

export const program = (id) => api.get(`/program/${id}`);

export const availableList = (params) => {
  return api.get(`/program/available${params ? `/${params._id}` : ''}`);
};

export const progressList = (params) => {
  return api.get(`/program/inprogress${params ? `/${params._id}` : ''}`);
};

export const completeList = (params) => {
  return api.get(`/program/completed${params ? `/${params._id}` : ''}`);
};

export const savedList = (params) => {
  return api.get(`/program/saved${params ? `/${params._id}` : ''}`);
};

export const programStart = (params) => {
  return api.get(
    `/progress/start/${params.userId}/${params.programId}/${params.sessionId}/${params.moduleId}/${params.paperformId}`,
  );
};

export const programEnd = (params, payload) => {
  return api.post(
    `/progress/end/${params.userId}/${params.programId}/${params.sessionId}/${params.moduleId}/${params.recordId}`,
    payload,
  );
};

export const programEntry = (params) => {
  return api.get(`/program/entry/${params.userId}/${params.programId}`);
};
