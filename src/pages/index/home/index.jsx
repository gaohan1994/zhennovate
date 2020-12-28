/*
 * @Author: centerm.gaohan
 * @Date: 2020-10-12 09:37:11
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-27 16:42:31
 */
import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import LayoutContainer from '@/component/layout/home-layout';
import LayoutFooter from '@/component/layout/home-footer';
import Program from '@/pages/index/program';
import ProgramDescribe from '@/pages/index/program/describe';
import ProgramDetail from '@/pages/index/detail';
import HomePage from '@/pages/index/home/home';
import './index.less';
import Insights from '../insights';
// import { useMount } from 'ahooks';

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
export default function (props) {
  const history = useHistory();
  // 如果是/ 跳转到home
  useEffect(() => {
    const { location } = props;
    if (location.pathname === '/') {
      history.replace('/home');
    }
  }, [window.location.href]);

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
        />
        <Route
          exact={true}
          path="/program/describe/:id"
          render={(props) => renderWithFooter(ProgramDescribe, props)}
        />
        <Route
          exact={true}
          path="/program/detail/:id"
          render={(props) => renderWithFooter(ProgramDetail, props)}
        />
        <Route
          exact={true}
          path="/home"
          render={(props) => renderWithFooter(HomePage, props)}
        />
        <Route
          exact={true}
          path="/insights"
          render={(props) => renderWithFooter(Insights, props)}
        />
      </AnimatedSwitch>
    </LayoutContainer>
  );
}
