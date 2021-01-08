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
  const isCheck = window.location.href.indexOf('sign/check') > -1;
  return (
    <Header className={`${prefix}-sign-header`}>
      <div
        className={`${prefix}-sign-logo`}
        onClick={() => history.push(`/home`)}
      >
        <img className={`${prefix}-sign-logo-img`} src={logo} />
        <span className={`${prefix}-sign-logo-text`}>Zhennovate</span>
      </div>

      {!isCheck && (
        <div className={`${prefix}-header-button`}>
          {!entry ? (
            <Button
              style={{ minWidth: 120 }}
              onClick={() => {
                history.push(`/sign/signup${history.location.search}`);
              }}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              style={{ minWidth: 120 }}
              onClick={() => {
                history.push(`/sign/signin${history.location.search}`);
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      )}
    </Header>
  );
}
