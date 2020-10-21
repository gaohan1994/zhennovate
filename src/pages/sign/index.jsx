/**
 * @todo sign主界面
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:28:24
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-20 22:33:58
 */
import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import LayoutContainer from '@/component/layout/sign-layout';
import Signup from '@/pages/sign/sign-up';
import Signin from '@/pages/sign/sign-in';
import Forgot from '@/pages/sign/forgot';
/**
 * 主页布局
 * 包括顶部导航栏 以及路由配置
 *
 * @export
 * @returns
 */
export default function () {
  const match = useParams();
  console.log('match', match);
  return (
    <LayoutContainer>
      <Switch>
        <Route path="/sign/signup" component={Signup} exact={true} />
        <Route path="/sign/signin" component={Signin} exact={true} />
        <Route path="/sign/forgot" component={Forgot} exact={true} />
      </Switch>
    </LayoutContainer>
  );
}
