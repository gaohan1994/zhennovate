export const isDevelopment = () => process.env.PROJECT_ENV === 'development';

export const isProduction = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return true;
    case 'development':
      return false;
    default:
      return false;
  }
};

/**
 * 测试环境   http://api.zhennovate.com
 */
export const BASE_URL = !isProduction() ? 'http://app.zhennovate.com' : '/api';
// : 'http://api.zhennovate.com';

export const ResponseCode = {
  success: 0,
};

export const getPaperfromUrl = (id) => {
  return `http://admin.zhennovate.com/paperform.html?id=${id}`;
};
