/*
 * @Author: centerm.gaohan
 * @Date: 2020-10-19 21:46:55
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-04 16:08:20
 */
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from '@/pages/index/home';
import Sign from '@/pages/sign';
import PaperformModal from './component/paperform-modal';
import CalendarModal from './component/calendar/calendar-modal';
import { message } from 'antd';
import AuthRoute from './component/auth/auth';

message.config({
  duration: 2,
  className: 'zhennovate-message',
});

const RouteMenu = [
  {
    // 注册
    path: '/sign',
    component: Sign,
  },
  {
    // 主页
    path: '/',
    component: Home,
  },
];

/**
 * App布局
 * 一级路由
 * 注册、登录、忘记密码、主页
 *
 * note:
 * 注册、登录、忘记密码 使用非导航栏头部
 * 主页以及相关使用 导航栏头部
 * @returns
 */
function App() {
  return (
    <div>
      <PaperformModal />
      <CalendarModal />
      <HashRouter>
        <Switch>
          {RouteMenu.map((item, index) => {
            const { path, component, ...rest } = item;

            if (item.path === '/sign') {
              return (
                <Route
                  path={path}
                  component={component}
                  key={index}
                  {...rest}
                />
              );
            } else {
              return (
                <AuthRoute key={index} {...rest} path={path} component={Home} />
              );
            }
          })}
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
