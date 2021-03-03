import { api } from '@/common/request';

export const setLearningReminder = (params) => {
  return api.get(`/setting/learningreminder/${params.userId}`);
};

export const getLearningReminder = (params) => {
  return api.get(`/getting/learningreminder/${params.userId}`);
};
