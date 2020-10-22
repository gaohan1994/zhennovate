/**
 * @Author: centerm.gaohan
 * @Date: 2020-10-19 22:01:06
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-22 17:41:05
 */
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Spin } from 'antd';
import ProgramChild from '@/pages/index/program/child';
import './index.less';

const prefix = 'page-program';

const { TabPane } = Tabs;

const tabsMenu = [
  {
    key: 'available',
    tab: 'Available',
    Component: ProgramChild,
  },
  {
    key: 'progress',
    tab: 'In Progress',
    Component: ProgramChild,
  },
  {
    key: 'complete',
    tab: 'Completed',
    Component: ProgramChild,
  },
  {
    key: 'save',
    tab: 'Saved',
    Component: ProgramChild,
  },
];

export default () => {
  // banner的ref
  const bannerContainer = useRef(null);
  const [bannerHeight, setBannerHeight] = useState(420);

  // 是否显示加载中 防止闪烁
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabsMenu[0].key);

  // 获得banner高度
  useEffect(() => {
    if (bannerContainer.current) {
      setBannerHeight(bannerContainer.current.clientHeight);
    }
  }, [bannerContainer.current]);

  useEffect(() => {
    if (showSkeleton) {
      setTimeout(() => {
        setShowSkeleton(false);
      }, 500);
    }
  }, [showSkeleton]);

  // 切换tab显示骨架屏
  const onChangeTab = (key) => {
    window.scrollTo({
      top: bannerHeight,
      behavior: 'smooth',
    });
    setShowSkeleton(true);
    setCurrentTab(key);
  };

  return (
    <div>
      <div className={`${prefix}-banner`} ref={bannerContainer}>
        banner
      </div>
      <Tabs
        centered
        activeKey={currentTab}
        onChange={(key) => onChangeTab(key)}
        style={{ marginTop: 24 }}
      >
        {tabsMenu.map((item) => {
          const { key, tab, Component } = item;
          return (
            <TabPane tab={tab} key={key}>
              <Spin spinning={showSkeleton} size="large">
                <Component tab={item} currentTab={currentTab} />
              </Spin>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
