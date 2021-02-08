/**
 * 渲染加入日历
 * @Author: centerm.gaohan
 * @Date: 2020-10-23 10:37:31
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-08 10:11:35
 */

import React from 'react';
import { Modal, Menu } from 'antd';
import { capitalize } from 'lodash';
import './index.less';
import { prefix, CalendarType, calendarIcons } from './index';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarActions } from './store';
import calendarHelper from './calendar-helper';

export const calendarItems = [
  { type: 'google', icon: calendarIcons['google'] },
  { type: 'outlook', icon: calendarIcons['outlook'] },
  { type: 'apple', icon: calendarIcons['apple'] },
];

function CalendarModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.calendar);
  const { data } = state;
  const { calendarType = CalendarType.normal } = data;

  const onHide = () => {
    dispatch({
      type: CalendarActions.hide,
    });
  };

  const onCalendarClick = (item) => {
    const { type } = item;

    const href = calendarHelper
      .setCalendarType(calendarType)
      .setCalendarData(data)
      .createCalendarData(type);

    window.open(href, 'calendar');
  };

  const dropMenu = (
    <Menu>
      {calendarItems.map((item) => {
        return (
          <Menu key={item.type} style={{ height: 56, margin: 0 }}>
            <a
              className={`${prefix}-item`}
              onClick={() => onCalendarClick(item)}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  style={{ margin: '0 9px', width: 24, maxWidth: 24 }}
                />
              )}
              <span>{`${capitalize(item.type)} Calendar`}</span>
            </a>
          </Menu>
        );
      })}
    </Menu>
  );
  return (
    <div>
      <Modal
        width={356}
        centered
        bodyStyle={{ padding: 0 }}
        title="Add to Calendar"
        footer={null}
        visible={state.visible}
        onCancel={onHide}
      >
        {dropMenu}
      </Modal>
    </div>
  );
}

export default CalendarModal;
export { CalendarModal };
