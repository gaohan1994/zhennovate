import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Dropdown } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { CaretDownFilled } from '@ant-design/icons';
import './index.less';
import logo from '@/assets/logo@3x.png';
import useSignSdk from '@/pages/sign/store/sign-sdk';

const prefix = 'component-layout';
const { Header } = Layout;

export default function () {
  const history = useHistory();
  const [activeKey, setActiveKey] = useState([]);

  const { isSign, sign, userLogout } = useSignSdk();

  useEffect(() => {
    const { href } = window.location;
    if (href.indexOf('/home') > -1) {
      setActiveKey(['home']);
    }
    if (href.indexOf('/program') > -1) {
      setActiveKey(['program']);
    }
    if (href.indexOf('/insights') > -1) {
      setActiveKey(['insights']);
    }
    if (href.indexOf('/workshops') > -1) {
      setActiveKey(['workshops']);
    }
  }, [window.location.href]);

  const onSelect = (keys) => {
    setActiveKey([keys.key]);
  };

  const onSetting = () => {
    history.push(`/sign/setting`);
  };

  const Logout = () => {
    userLogout(() => {
      // notificatin.success({ message: 'Log Out' });
    });
  };

  const dropMenu = (
    <Menu>
      <Menu.Item key="setting" onClick={onSetting}>
        Settings
      </Menu.Item>
      <Menu.Item key="logout" onClick={Logout}>
        Log out
      </Menu.Item>
    </Menu>
  );

  const username = (sign && sign.userinfo && sign.userinfo.Name) || 'name';
  const firstWord = username.substring(0, 1);

  // <Menu.Item key="insights" style={{ borderBottom: 0 }}>
  //   <Link to="/insights">Insights</Link>
  // </Menu.Item>;
  // <Menu.Item key="workshops" style={{ borderBottom: 0 }}>
  //   <Link to="/workshops">Workshops</Link>
  // </Menu.Item>;
  return (
    <Header
      className={`${prefix}-header`}
      style={{ position: 'fixed', zIndex: 200, padding: '0 24px' }}
    >
      <div
        className={`${prefix}-logo`}
        style={{ backgroundImage: `url(${logo})` }}
      />
      <Menu mode="horizontal" selectedKeys={activeKey} onSelect={onSelect}>
        <Menu.Item key="home" style={{ borderBottom: 0, fontWeight: 900 }}>
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="program" style={{ borderBottom: 0, fontWeight: 900 }}>
          <Link to="/program">Programs</Link>
        </Menu.Item>
      </Menu>

      <div className={`${prefix}-header-button`}>
        {!isSign ? (
          <Button
            style={{ minWidth: 120 }}
            onClick={() => {
              history.push(`/sign/signup`);
            }}
          >
            Sign up
          </Button>
        ) : (
          <Dropdown trigger={['click']} overlay={dropMenu}>
            <div className={`${prefix}-user`} common-touch="touch">
              <div
                className={`${prefix}-user-avatar`}
                style={{ backgroundColor: '#1890ff' }}
              >
                {firstWord.toUpperCase()}
              </div>
              <span className={`${prefix}-user-name`}>{username}</span>

              <CaretDownFilled style={{ margin: '0 16px 0 4px' }} />
            </div>
          </Dropdown>
        )}
      </div>
    </Header>
  );
}
