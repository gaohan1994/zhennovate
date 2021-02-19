/**
 * 渲染加入日历
 * @Author: centerm.gaohan
 * @Date: 2020-10-23 10:37:31
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-08 10:15:43
 */

import React, { useState } from 'react';
import { Modal, Button, Dropdown, Menu } from 'antd';
import { capitalize } from 'lodash';
import imgapple from '@/assets/SVG/Icon-AppleCalendar.svg';
import imggoogle from '@/assets/SVG/Icon-GoogleCalendar.svg';
import imgoutlook from '@/assets/Icon-Outlook@2x.png';
import './index.less';
import calendarHelper from './calendar-helper';

export const calendarIcons = {
  apple: imgapple,
  google: imggoogle,
  outlook: imgoutlook,
};

export const calendarItems = [
  { type: 'google', icon: calendarIcons['google'] },
  { type: 'outlook', icon: calendarIcons['outlook'] },
  { type: 'apple', icon: calendarIcons['apple'] },
];

export const CalendarType = {
  normal: 'normal',
  reflect: 'reflect',
};

export const prefix = 'component-calendar';

export const getCalendarHost = () => {
  const hostname = window.location.hostname;

  return hostname === 'localhost' ? 'http://demo-us.zhennovate.com' : hostname;
};

function Calendar(props) {
  const { data, type = 'normal', program, renderType = 'drop', render } = props;
  // 是否显示calendar
  const [visible, setVisible] = useState(false);

  const onCalendarClick = (item) => {
    console.log('program', program);
    const href = calendarHelper
      .setCalendarType(type)
      .setCalendarData(data)
      .createCalendarData(item.type);

    console.log('[href]', href);
    window.open(href, 'calendar');
  };

  const dropMenu = (
    <Menu>
      {calendarItems.map((item) => {
        return (
          <Menu.Item key={item.type} style={{ height: 56, margin: 0 }}>
            <a
              target="_blank"
              className={`${prefix}-item`}
              onClick={() => onCalendarClick(item)}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  style={{ marginRight: 9, width: 24, height: 24 }}
                />
              )}
              <span>{`${capitalize(item.type)} Calendar`}</span>
            </a>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <div>
      {render ? (
        render()
      ) : renderType === 'drop' ? (
        <Dropdown overlay={dropMenu} trigger={['click']}>
          <Button>Add to calendar</Button>
        </Dropdown>
      ) : (
        <Button onClick={() => setVisible(true)}>Add to calendar</Button>
      )}
      <Modal
        width={356}
        centered
        bodyStyle={{ padding: 0 }}
        title="Add to calendar"
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        {dropMenu}
      </Modal>
    </div>
  );
}

export default Calendar;
