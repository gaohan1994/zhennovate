/**
 * @todo program接口
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:16:37
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 14:12:42
 */

import { api } from '@/common/request';

export const program = (id) => api.get(`/program/${id}`);
