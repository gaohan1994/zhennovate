import React from 'react';
import { Layout } from 'antd';
import './index.less';
import logo from '@/assets/logo@3x.png';
import { useHistory } from 'react-router-dom';

const prefix = 'component-layout';
const { Header } = Layout;

export default function (props) {
  const history = useHistory();

  const [whiteList] = React.useState(['signin']);

  const onClick = () => {
    const { href } = window.location;

    const token = whiteList.some((wl) => {
      return href.indexOf(wl) > -1;
    });

    if (token) {
      history.push(`/home`);
    }
  };

  return (
    <Header className={`${prefix}-sign-header`}>
      <div className={`${prefix}-sign-logo`} onClick={onClick}>
        <img className={`${prefix}-sign-logo-img`} src={logo} />
        <span className={`${prefix}-sign-logo-text`}>Zhennovate</span>
      </div>
    </Header>
  );
}
