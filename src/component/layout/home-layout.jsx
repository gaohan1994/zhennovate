/*
 * @Author: centerm.gaohan
 * @Date: 2020-10-19 21:53:52
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 17:20:15
 */

import React from 'react';
import LayoutHeader from '@/component/layout/header';
import LayoutFooter from '@/component/layout/home-footer';
import { Layout } from 'antd';
import './index.less';

// const prefix = 'page-home';
/**
 * 主页布局
 * 包括顶部导航栏 以及路由配置
 *
 * @export
 * @returns
 */
function LayoutContainer(props) {
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <LayoutHeader />
      <Layout.Content>
        <div style={{ flex: 1 }}>{props.children}</div>
        <LayoutFooter />
      </Layout.Content>
    </Layout>
  );
}
export default LayoutContainer;
