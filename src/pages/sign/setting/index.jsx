/**
 * @todo 用户设置页面
 * @Author: centerm.gaohan
 * @Date: 2021-02-22 14:43:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-22 15:39:37
 */
import React from 'react';
import { Menu, Layout } from 'antd';
import '@/pages/index/detail/index.less';
import AuthRoute from '@/component/auth/auth';
import { renderWithFooter } from '@/pages/index/home';

const prefix = 'page-detail';

const { Sider, Content } = Layout;

function Setting() {
  return (
    <Layout
      className={`${prefix}-pos`}
      style={{
        position: 'fixed',
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Sider theme="light">
        <h1>Setting</h1>
        <Menu mode="inline" className="custom-antd-first-menu">
          <Menu.Item>
            Account information
            {/* <MenuTitle title={item.title} icon={item.icon} /> */}
          </Menu.Item>
          <Menu.Item>Notification</Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          {/* <AuthRoute
            path="/program"
            exact={true}
            component={(props) => renderWithFooter(Program, props)}
          /> */}
        </AnimatedSwitch>
      </Content>
    </Layout>
  );
}
export default Setting;
