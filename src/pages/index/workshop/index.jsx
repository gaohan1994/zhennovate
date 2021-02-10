/**
 * @todo Workshop 页面
 * @Author: centerm.gaohan
 * @Date: 2021-02-08 14:03:52
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-08 14:11:24
 */
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Spin } from 'antd';
import ProgramChild from '@/pages/index/program/child';
import '@/pages/index/program/index.less';
import { WorkshopTabTitles, WorkshopTabKeys } from './constants';
import { formatSearch } from '@/common/request';
import imghome from '@/assets/Banner-with-Character.svg';
import useSignSdk from '@/pages/sign/store/sign-sdk';

const prefix = 'page-program';
const { TabPane } = Tabs;

const tabsMenu = [
  {
    key: WorkshopTabKeys.upcoming,
    tab: WorkshopTabTitles.upcoming,
    Component: <div />,
    empty: '',
  },
  {
    key: WorkshopTabKeys.recording,
    tab: WorkshopTabTitles.recording,
    Component: ProgramChild,
    empty: 'Recording Workshops will be added here.',
  },
  {
    key: WorkshopTabKeys.save,
    tab: WorkshopTabTitles.save,
    Component: ProgramChild,
    empty: 'Saved Workshops will be added here.',
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
      if (Object.keys(WorkshopTabKeys).some((k) => k === searchParams.entry)) {
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
        <h1>Workshops</h1>
      </div>
      <Tabs
        centered
        activeKey={currentTab}
        onChange={(key) => {
          checkSign(() => onChangeTab(key));
        }}
        style={{ marginTop: 24 }}
      >
        {tabsMenu.map((item) => {
          const { key, tab } = item;
          return (
            <TabPane tab={tab} key={key}>
              <Spin spinning={showSkeleton} size="large">
                {/* <Component tab={item} currentTab={currentTab} /> */}
                <div />
              </Spin>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
