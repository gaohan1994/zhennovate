/**
 * 底部组件
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 17:12:33
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-01 00:08:24
 */

import React from 'react';
// import { Layout } from 'antd';
import './index.less';
import logo from '@/assets/logo.png';

const prefix = 'component-layout';

export default () => {
  return (
    // <Layout.Footer>

    // </Layout.Footer>
    <div className={`${prefix}-footer`}>
      <div className={`${prefix}-sign-logo`}>
        <img className={`${prefix}-sign-logo-img`} src={logo} />
        <span className={`${prefix}-sign-logo-text`}>Zhennovate</span>
      </div>
      <div className={`${prefix}-footer-text`}>
        © 2015 - 2021 Zhennovate. All rights reserved.
      </div>
      <div className={`${prefix}-footer-text`}>
        <a
          href="https://zhennovate.com/privacy"
          style={{ textDecoration: 'underline', marginRight: 24 }}
        >
          Privacy{' '}
        </a>
        <a
          href="https://zhennovate.com/terms"
          style={{ textDecoration: 'underline' }}
        >
          Terms of Service
        </a>
      </div>
    </div>
  );
};
