/**
 * @todo sign主界面
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:28:24
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-27 23:33:36
 */
import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import LayoutContainer from '@/component/layout/sign-layout';
import Signup from '@/pages/sign/sign-up';
import Signin from '@/pages/sign/sign-in';
import Forgot from '@/pages/sign/forgot';
import Check from '@/pages/sign/check';
import ResetPage from './forgot/reset';
import SetPassword from '@/pages/sign/set-password';
/**
 * 主页布局
 * 包括顶部导航栏 以及路由配置
 *
 * @export
 * @returns
 */
export default function () {
  const [entry, setEntry] = useState(false);

  useEffect(() => {
    // 这里判断右上角显示什么
    const isSignup = window.location.href.indexOf('sign/signup') > -1;
    setEntry(isSignup);
  }, [window.location.href]);

  return (
    <LayoutContainer entry={entry}>
      <Switch>
        <Route path="/sign/signup" component={Signup} exact={true} />
        <Route path="/sign/signin" component={Signin} exact={true} />
        <Route path="/sign/forgot" component={Forgot} exact={true} />
        <Route
          path="/sign/resetpassword/:forgotId"
          component={ResetPage}
          exact={true}
        />
        <Route path="/sign/setpassword" component={SetPassword} exact={true} />
        <Route path="/sign/check" component={Check} exact={true} />
      </Switch>
    </LayoutContainer>
  );
}
