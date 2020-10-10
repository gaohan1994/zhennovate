import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import SignUp from '@/pages/sign/sign-up';
import SignIn from '@/pages/sign/sign-in';
import Home from '@/pages/index/home';
import PaperformModal from './component/paperform-modal';
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
      <HashRouter>
        <Switch>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
