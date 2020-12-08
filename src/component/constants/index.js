import { api } from '@/common/request';

export const saveProgram = (params) =>
  api.get(`/program/saved/${params.userId}/${params.programId}`);
