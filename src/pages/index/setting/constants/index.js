import { api } from '@/common/request';

export const setLearningReminder = (params, payload) => {
  return api.post(`/setting/learningreminder/${params.userId}`, payload);
};

export const getLearningReminder = (params) => {
  return api.get(`/setting/learningreminder/${params.userId}`);
};
