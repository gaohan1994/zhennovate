/*
 * @Author: centerm.gaohan
 * @Date: 2020-10-19 21:46:55
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-20 22:30:13
 */
import React, { useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from '@/pages/index/home';
import Sign from '@/pages/sign';
import PaperformModal from './component/paperform-modal';

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
