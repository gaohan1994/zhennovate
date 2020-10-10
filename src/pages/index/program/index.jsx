import React, { useRef, useEffect, useState } from 'react';
import { Layout, Menu, Spin } from 'antd';
import './index.less';

const prefix = 'page-program';

const { Sider, Content } = Layout;

const menus = [
  {
    name: '左右布局',
  },
  {
    name: '弹窗',
  },
];

export default () => {
  const iframeContainerRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(-1);
  const [iframeWidth, setIframeWidth] = useState(-1);

  useEffect(() => {
    if (iframeContainerRef.current.clientHeight) {
      console.log('iframeContainerRef', iframeContainerRef.current.clientHeight);
      console.log('iframeContainerRef width', iframeContainerRef.current.clientWidth);
      setIframeHeight(iframeContainerRef.current.clientHeight);
      setIframeWidth(iframeContainerRef.current.clientWidth);
    }
  }, [iframeContainerRef.current]);

  return (
    <Layout className={`${prefix}-pos`}>
      <Sider theme="light" collapsible>
        <Menu>
          {menus.map((item) => {
            return <Menu.Item key={item.name}>{item.name}</Menu.Item>;
          })}
        </Menu>
      </Sider>

      <Content className={`${prefix}`}>
        <div ref={iframeContainerRef} className={`${prefix}-box`}>
          {iframeHeight !== -1 ? (
            <iframe
              src="http://znadmin.tprlearn.com/paperform.html?id=1hw67gdf"
              height={iframeHeight}
              width={iframeWidth}
            />
          ) : (
            <Spin />
          )}
        </div>
      </Content>
    </Layout>
  );
};
