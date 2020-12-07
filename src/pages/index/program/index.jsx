/**
 * @Author: centerm.gaohan
 * @Date: 2020-10-19 22:01:06
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-07 17:02:20
 */
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Spin } from 'antd';
import ProgramChild from '@/pages/index/program/child';
import './index.less';
import { ProgramTabKeys } from './constants';
import { formatSearch } from '@/common/request';
import imghome from '@/assets/Banner-with-Character.svg';
import useSignSdk from '@/pages/sign/store/sign-sdk';

const prefix = 'page-program';

const { TabPane } = Tabs;

const tabsMenu = [
  {
    key: ProgramTabKeys.available,
    tab: 'Available',
    Component: ProgramChild,
    empty: '',
  },
  {
    key: ProgramTabKeys.progress,
    tab: 'In Progress',
    Component: ProgramChild,
    empty: 'In-progress programs will be added here.',
  },
  {
    key: ProgramTabKeys.complete,
    tab: 'Completed',
    Component: ProgramChild,
    empty: 'Completed programs will be added here.',
  },
  {
    key: ProgramTabKeys.save,
    tab: 'Saved',
    Component: ProgramChild,
    empty: 'Saved programs will be added here.',
  },
];

export default (props) => {
  // banner的ref
  const searchParams = formatSearch(props.location.search);
  const bannerContainer = useRef(null);
  const [bannerHeight, setBannerHeight] = useState(420);

  // 是否显示加载中 防止闪烁
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabsMenu[0].key);

  const { checkSign } = useSignSdk();

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

  useEffect(() => {
    // availableList().then((result) => {
    //   console.log('result', result);
    // });
  }, []);

  // 切换tab显示骨架屏 滑动到tabs顶部
  const onChangeTab = (key) => {
    const top = bannerHeight + Math.random();
    window.scrollTo({
      top: top,
      behavior: 'smooth',
    });
    setShowSkeleton(true);
    setCurrentTab(key);
  };

  useEffect(() => {
    if (searchParams.entry) {
      if (Object.keys(ProgramTabKeys).some((k) => k === searchParams.entry)) {
        checkSign(() => onChangeTab(searchParams.entry));
      }
    }
  }, []);

  return (
    <div>
      <div
        className={`${prefix}-banner`}
        ref={bannerContainer}
        style={{ backgroundImage: `url(${imghome})` }}
      >
        <h1>Programs</h1>
      </div>
      <Tabs
        centered
        activeKey={currentTab}
        onChange={(key) => checkSign(() => onChangeTab(key))}
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
