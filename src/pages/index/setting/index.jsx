/**
 * @todo 用户设置页面
 * @Author: centerm.gaohan
 * @Date: 2021-02-22 14:43:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-03 18:44:01
 */
import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import '@/pages/index/detail/index.less';
import AuthRoute from '@/component/auth/auth';
import { renderWithFooter } from '@/pages/index/home';
// import Infomation from './infomation';
import Notification from './notification';
import { Link, Switch } from 'react-router-dom';
import './index.less';

const prefix = 'page-detail';

const SettingRouter = [
  // {
  //   key: 'infomation',
  //   title: 'Account information',
  //   path: '/setting',
  //   Component: Infomation,
  // },
  {
    key: 'notification',
    title: 'Notification',
    path: '/setting/notification',
    Component: Notification,
  },
];

const { Sider, Content } = Layout;

function Setting(props) {
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    const matchIndex = SettingRouter.findIndex((sr) => {
      return sr.path === props.location.pathname;
    });

    setSelectedKeys([SettingRouter[matchIndex || 0].key]);
  }, []);

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
        <h1 className="setting-title">Settings</h1>
        <Menu
          mode="inline"
          onSelect={(params) => {
            console.log(params);
            setSelectedKeys(params.selectedKeys);
          }}
          selectedKeys={selectedKeys}
          className="custom-antd-first-menu"
        >
          {SettingRouter.map((route) => {
            return (
              <Menu.Item key={route.key}>
                <Link to={route.path}>{route.title}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Content className={prefix}>
        <Switch>
          {SettingRouter.map((route) => {
            return (
              <AuthRoute
                key={route.key}
                path={route.path}
                exact={true}
                component={(props) => renderWithFooter(route.Component, props)}
              />
            );
          })}
        </Switch>
      </Content>
    </Layout>
  );
}
export default Setting;
