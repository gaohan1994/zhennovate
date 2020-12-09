import { api } from '@/common/request';

export const saveProgram = (params) =>
  api.get(`/user/saveprogram/${params.userId}/${params.programId}`);
