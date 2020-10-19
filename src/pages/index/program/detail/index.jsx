/**
 * @Author: centerm.gaohan
 * @Date: 2020-10-14 09:20:54
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-19 22:07:34
 */
import React, { useRef, useEffect, useState } from 'react';
import { Layout, Menu, Spin, Button } from 'antd';
import { useDispatch } from 'react-redux';
import postMessageSdk from '@/common/post-message-sdk';
import '../index.less';

const prefix = 'page-program';

const { Sider, Content } = Layout;

const menus = [
  {
    id: '1',
    name: '左右布局',
    paperform: {
      type: 'iframe',
      id: '1hw67gdf',
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
  {
    id: '3',
    name: '非常长的paperform',
    paperform: {
      type: 'iframe',
      id: 'hik5qng6',
    },
  },
  {
    id: '4',
    name: '视频paper结合',
    paperform: {
      type: 'iframe',
      id: '1hw67gdf',
    },
  },

  {
    id: '5',
    name: '视频paper结合2',
    paperform: {
      type: 'modal',
      id: '1hw67gdf',
    },
  },
];

/**
 * @time 10 13
 * @question iframe的高度放到外层
 * @question 视频和paperfrom结合
 * @question paperfrom会保存做过的状态
 *
 * 渲染paperform function
 *
 * @param {*} props
 * @return {*}
 */
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
          }}
        >
          open paperform modal
        </Button>
      </div>
    );
  }
  return <iframe {...rest} src={`${commonUrl}?id=${paperform.id}&time=${new Date().getTime()}`} />;
};

export default () => {
  const iframeContainerRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(-1);
  const [iframeWidth, setIframeWidth] = useState(-1);

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [currentMenu, setCurrentMenu] = useState({});

  /**
   * 动态设置右侧高度
   * 为剩余屏幕高度
   */
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
    const menu = menus.find((m) => m.id === selectedKeys[0]);
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
            <div className={`${prefix}-spin`}>
              <Spin size="large" />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};
