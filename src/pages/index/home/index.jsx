/*
 * @Author: centerm.gaohan
 * @Date: 2020-10-12 09:37:11
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-19 22:20:10
 */
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import LayoutContainer from '@/component/layout/home-layout';
import Program from '@/pages/index/program';
import ProgramDescribe from '@/pages/index/program/describe';
import './index.less';

// const prefix = 'page-home';
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
    <LayoutContainer>
      <Switch>
        <Route path="/program" component={Program} exact={true} />
        <Route path="/program/describe/:id" component={ProgramDescribe} exact={true} />
      </Switch>
    </LayoutContainer>
  );
}
