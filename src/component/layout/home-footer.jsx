/**
 * 底部组件
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 17:12:33
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-22 17:09:07
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
        © 2020 Zhennovate, Inc. All rights reserved
      </div>
      <div className={`${prefix}-footer-text`}>Privacy Terms of Service</div>
    </div>
  );
};
