import { api } from '@/common/request';

export const saveProgram = (params) =>
  api.get(`/user/saveprogram/${params.userId}/${params.programId}`);

export const unsaveprogram = (params) =>
  api.get(`/user/unsaveprogram/${params.userId}/${params.programId}`);
