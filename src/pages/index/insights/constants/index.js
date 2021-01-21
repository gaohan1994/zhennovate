/**
 * @todo insights 接口
 * @Author: centerm.gaohan
 * @Date: 2021-01-18 14:27:02
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-18 14:28:28
 */
import { api } from '@/common/request';

export const emotion = (params) => {
  return api.get(`/emotion/${params.userId}/${params.duration}`);
};
