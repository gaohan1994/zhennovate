import React from 'react';
import { Layout, Button } from 'antd';
import './index.less';
import logo from '@/assets/logo@3x.png';
import { useHistory } from 'react-router-dom';

const prefix = 'component-layout';
const { Header } = Layout;

export default function (props) {
  const history = useHistory();
  const { entry } = props;
  return (
    <Header className={`${prefix}-sign-header`}>
      <div
        className={`${prefix}-sign-logo`}
        onClick={() => history.push(`/home`)}
      >
        <img className={`${prefix}-sign-logo-img`} src={logo} />
        <span className={`${prefix}-sign-logo-text`}>Zhennovate</span>
      </div>

      <div className={`${prefix}-header-button`}>
        {!entry ? (
          <Button
            style={{ minWidth: 120 }}
            onClick={() => {
              history.push(`/sign/signup`);
            }}
          >
            Sign Up
          </Button>
        ) : (
          <Button
            style={{ minWidth: 120 }}
            onClick={() => {
              history.push(`/sign/signin`);
            }}
          >
            Sign In
          </Button>
        )}
      </div>
    </Header>
  );
}
