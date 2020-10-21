import React from 'react';
import { Layout } from 'antd';
import './index.less';
import logo from '@/assets/logo@3x.png';

const prefix = 'component-layout';
const { Header } = Layout;

export default function () {
  return (
    <Header className={`${prefix}-header`}>
      <div className={`${prefix}-sign-logo`}>
        <img className={`${prefix}-sign-logo-img`} src={logo} />
        <span className={`${prefix}-sign-logo-text`}>Zhennovate</span>
      </div>
    </Header>
  );
}
