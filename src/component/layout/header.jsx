import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';
import logo from '@/assets/logo@3x.png';

const prefix = 'component-layout';
const { Header } = Layout;

export default function () {
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    const { href } = window.location;
    console.log('href', href);
    if (href.indexOf('/home') > -1) {
      setActiveKey('home');
    }
    if (href.indexOf('/program') > -1) {
      setActiveKey('program');
    }
    if (href.indexOf('/insights') > -1) {
      setActiveKey('insights');
    }
  }, [window.location]);

  return (
    <Header
      className={`${prefix}-header`}
      style={{ position: 'fixed', zIndex: 200 }}
    >
      <div
        className={`${prefix}-logo`}
        style={{ backgroundImage: `url(${logo})` }}
      />
      <Menu mode="horizontal" activeKey={activeKey}>
        <Menu.Item key="home" style={{ borderBottom: 0 }}>
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="program" style={{ borderBottom: 0 }}>
          <Link to="/program">Program</Link>
        </Menu.Item>
        <Menu.Item key="insights" style={{ borderBottom: 0 }}>
          <Link to="/insights">Insights</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}
