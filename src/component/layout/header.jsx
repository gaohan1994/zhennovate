import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

const prefix = 'component-layout';
const { Header } = Layout;

export default function () {
  return (
    <Header className={`${prefix}-header`}>
      <div className="logo" />
      <Menu mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Link to="home">home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="program">program</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="insights">insights</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}
