import React, { useRef, useEffect, useState } from 'react';
import { Layout, Menu, Spin, Button } from 'antd';
import { useDispatch } from 'react-redux';
import './index.less';
import postMessageSdk from '@/common/post-message-sdk';

const prefix = 'page-program';

const { Sider, Content } = Layout;

const menus = [
  {
    id: '1',
    name: '左右布局',
    paperform: {
      type: 'iframe',
      paperformId: '1hw67gdf',
    },
  },
  {
    id: '2',
    name: '弹窗',
    paperform: {
      type: 'modal',
      id: '1hw67gdf',
    },
  },
];

const RenderPaperForm = (props) => {
  const dispatch = useDispatch();
  const commonUrl = 'http://znadmin.tprlearn.com/paperform.html';
  const { data, ...rest } = props;
  const { paperform } = data;

  if (paperform.type === 'modal') {
    return (
      <div>
        <Button
          onClick={() => {
            dispatch({
              type: 'CHANGE_PAPERFORM_MODAL_VISIBLE',
              payload: true,
            });
          }}>
          open paperform modal
        </Button>
      </div>
    );
  }
  return <iframe {...rest} src={`${commonUrl}?id=1hw67gdf`} />;
};

export default () => {
  const iframeContainerRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(-1);
  const [iframeWidth, setIframeWidth] = useState(-1);

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [currentMenu, setCurrentMenu] = useState({});

  useEffect(() => {
    if (iframeContainerRef.current.clientHeight) {
      setIframeHeight(iframeContainerRef.current.clientHeight);
      setIframeWidth(iframeContainerRef.current.clientWidth);
    }
  }, [iframeContainerRef.current]);

  /**
   * 监听window.postmessage事件
   */
  useEffect(() => {
    window.addEventListener('message', postMessageSdk.receiveMessage, false);
    return () => window.removeEventListener('message', postMessageSdk.receiveMessage);
  }, []);

  useEffect(() => {
    console.log('selectedKeys', selectedKeys);
    const menu = menus.find((m) => m.id === selectedKeys[0]);
    console.log('menu', menu);
    if (menu) {
      setCurrentMenu(menu);
    }
  }, [selectedKeys]);

  const onSelect = (keys) => {
    setSelectedKeys([keys.key]);
  };

  return (
    <Layout className={`${prefix}-pos`}>
      <Sider theme="light" collapsible>
        <Menu selectedKeys={selectedKeys} onSelect={onSelect} defaultSelectedKeys={['2']}>
          {menus.map((item) => {
            return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
          })}
        </Menu>
      </Sider>

      <Content className={`${prefix}`}>
        <div ref={iframeContainerRef} className={`${prefix}-box`}>
          {currentMenu && currentMenu.paperform && iframeHeight !== -1 ? (
            <RenderPaperForm data={currentMenu} height={iframeHeight} width={iframeWidth} />
          ) : (
            <Spin />
          )}
        </div>
      </Content>
    </Layout>
  );
};
