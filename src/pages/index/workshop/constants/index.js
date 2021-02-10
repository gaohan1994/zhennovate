import { api } from '@/common/request';

export const workshopUpcoming = (params) => {
  return api.get(`/workshop/upcoming/${params.userId}`);
};

export const WorkshopTabKeys = {
  upcoming: 'upcoming',
  recording: 'recording',
  save: 'save',
};

export const WorkshopTabTitles = {
  upcoming: 'Upcoming',
  recording: 'Recording',
  save: 'Saved',
};
