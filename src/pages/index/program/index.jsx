/**
 * @Author: centerm.gaohan
 * @Date: 2020-10-19 22:01:06
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-19 22:17:32
 */
import React from 'react';
import { Tabs } from 'antd';
import Available from '@/pages/index/program/available';
import Complete from '@/pages/index/program/complete';
import Progress from '@/pages/index/program/progress';
import Save from '@/pages/index/program/save';

const { TabPane } = Tabs;

const tabsMenu = [
  {
    key: '1',
    tab: 'Available',
    Component: Available,
  },
  {
    key: '3',
    tab: 'In Progress',
    Component: Progress,
  },
  {
    key: '2',
    tab: 'Completed',
    Component: Complete,
  },
  {
    key: '4',
    tab: 'Saved',
    Component: Save,
  },
];

export default () => {
  return (
    <div>
      <div>banner</div>
      <Tabs defaultActiveKey="1" centered>
        {tabsMenu.map((item) => {
          const { key, tab, Component } = item;
          return (
            <TabPane tab={tab} key={key}>
              <Component />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
