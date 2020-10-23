/*
 * @Author: centerm.gaohan
 * @Date: 2020-10-12 09:37:11
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-23 11:27:35
 */
import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import LayoutContainer from '@/component/layout/home-layout';
import LayoutFooter from '@/component/layout/home-footer';
import Program from '@/pages/index/program';
import ProgramDescribe from '@/pages/index/program/describe';
import ProgramDetail from '@/pages/index/detail';
import './index.less';

const renderWithFooter = (Component, props) => {
  return (
    <div>
      <Component {...props} />
      <LayoutFooter />
    </div>
  );
};
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
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route
          exact={true}
          path="/program"
          render={(props) => renderWithFooter(Program, props)}
          // component={renderWithFooter(Program)}
        />
        <Route
          exact={true}
          path="/program/describe/:id"
          render={(props) => renderWithFooter(ProgramDescribe, props)}
          // component={ProgramDescribe}
        />
        <Route
          exact={true}
          path="/program/detail/:id"
          render={(props) => renderWithFooter(ProgramDetail, props)}
          // component={ProgramDetail}
        />
      </AnimatedSwitch>
    </LayoutContainer>
  );
}
