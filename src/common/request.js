/**
 * common request util
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:10:21
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-27 23:33:25
 */
import { BASE_URL } from './config';
import { notification } from 'antd';
import { merge } from 'lodash';
import { useHistory } from 'react-router-dom';

/**
 * @todo [传入条件返回格式化请求数据]
 * @param json
 */
export const jsonToQueryString = (json) => {
  const field = Object.keys(json)
    .map((key) => {
      if (json[key] !== undefined) {
        return key + '=' + json[key];
      } else {
        return '';
      }
    })
    .filter((f) => !!f)
    .join('&');
  return field.length > 0 ? `?${field}` : '';
};

export const formatListResult = (result) => {
  const mergeResult = merge({}, result);
  return {
    list: mergeResult.data.rows || [],
    total: mergeResult.data.total || 0,
  };
};

export const formatSearch = (search) => {
  let result = {};
  search
    .replace('?', '')
    .split('&')
    .forEach((item) => {
      result[item.split('=')[0]] = item.split('=')[1];
    });
  return result;
};

export const useQueryParam = (paramId) => {
  const history = useHistory();
  const params = formatSearch(history.location.search);
  return params[paramId] || undefined;
};

export const formatPaginate = (params) => {
  return {
    pageSize: params.pageSize,
    pageNum: params.current,
  };
};

export const formatListWithKey = (result) => {
  const formatListUtil = (list) => {
    const mergeList = merge([], list);
    return mergeList.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
  };

  if (Array.isArray(result)) {
    return formatListUtil(result);
  }

  if (Array.isArray(result.data)) {
    return {
      ...result,
      data: formatListUtil(result.data),
    };
  }

  return {
    ...result,
    data: formatListUtil(result.data.rows),
  };
};

/**
 * fetch 工具
 *
 * @author Ghan
 * @class ApiRequest
 */
class ApiRequest {
  baseOptions(params, method = 'GET', hasHeader) {
    let { url, data } = params;
    let contentType = 'application/json';
    contentType = params.contentType || contentType;
    const option = {
      method: method,
      headers: {
        'Content-Type': contentType,
      },
      // credentials: 'include',
      ...(method === 'POST' ? { body: data } : {}),
    };
    console.log('option', option);
    if (hasHeader === false) {
      delete option.headers;
    }
    return fetch(`${BASE_URL}${url}`, option)
      .then((res) => res.json())
      .then((res) => {
        // if (res.error_code !== 0) {
        //   notification.error({ message: res.message });
        // }
        return res;
      })
      .catch((error) => {
        notification.warn({
          message: error.message,
        });
      });
  }

  get(url, data = '') {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data) {
    let params = {
      url,
      data: typeof data === 'string' ? data : JSON.stringify(data),
    };
    return this.baseOptions(params, 'POST');
  }

  postFormData(url, data) {
    let params = {
      url,
      data: data,
    };
    return this.baseOptions(params, 'POST', false);
  }

  put(url, data) {
    let option = { url, data };
    return this.baseOptions(option, 'PUT');
  }

  delete(url, data = '') {
    let option = { url, data };
    return this.baseOptions(option, 'DELETE');
  }
}

const api = new ApiRequest();

export { api };
