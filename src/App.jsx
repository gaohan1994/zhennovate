/*
 * @Author: centerm.gaohan
 * @Date: 2020-10-19 21:46:55
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-19 21:58:05
 */
import React, { useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import SignUp from '@/pages/sign/sign-up';
import SignIn from '@/pages/sign/sign-in';
import Forgot from '@/pages/sign/forgot';
import Home from '@/pages/index/home';
import PaperformModal from './component/paperform-modal';

const RouteMenu = [
  {
    // 注册
    path: '/sign-up',
    component: SignUp,
  },
  {
    // 登录
    path: '/sign-in',
    component: SignIn,
  },
  {
    // 忘记密码
    path: '/forgot-password',
    component: Forgot,
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
  useEffect(() => {
    // 这里校验是否登录 是否跳转注册页面
  }, []);

  return (
    <div>
      <PaperformModal />
      <HashRouter>
        <Switch>
          {RouteMenu.map((item, index) => {
            const { path, component, ...rest } = item;
            return <Route path={path} component={component} key={index} {...rest} />;
          })}
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
