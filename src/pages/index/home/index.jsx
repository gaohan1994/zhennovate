/*
 * @Author: centerm.gaohan
 * @Date: 2020-10-12 09:37:11
 * @Last Modified by:   centerm.gaohan
 * @Last Modified time: 2020-10-12 09:37:11
 */
import React from 'react';
import LayoutHeader from '@/component/layout/header';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Layout } from 'antd';
import Program from '@/pages/index/program';
import './index.less';
// const { Content } = Layout;

const prefix = 'page-home';
/**
 * 主页布局
 * 包括顶部导航栏 以及路由配置
 *
 * @export
 * @returns
 */
export default function () {
  const match = useRouteMatch();
  console.log('match', match);
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <LayoutHeader />

      <Layout className={`${prefix}-content`}>
        <div style={{ flex: 1 }}>
          <Switch>
            <Route path="/program">
              <Program />
            </Route>
          </Switch>
        </div>
      </Layout>
    </Layout>
  );
}
