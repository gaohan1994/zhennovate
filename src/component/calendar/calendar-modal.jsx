/**
 * 渲染加入日历
 * @Author: centerm.gaohan
 * @Date: 2020-10-23 10:37:31
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-04 11:41:57
 */

import React, { useState, useEffect } from 'react';
import { Modal, Menu } from 'antd';
import calendar from './calendar';
import { capitalize } from 'lodash';
import './index.less';
import moment from 'moment';
import urlencode from 'urlencode';
import { prefix, CalendarType, calendarIcons } from './index';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarActions } from './store';
import { RenderPaperformKeyTypes } from '../paperform';

function CalendarModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.calendar);
  const [calendarData, setCalendarData] = useState([]);
  const { data } = state;
  const { calendarType = CalendarType.normal, program } = data;

  const onHide = () => {
    dispatch({
      type: CalendarActions.hide,
    });
  };

  useEffect(() => {
    console.log('[Rrflect Calendar Data:]', data);

    let calendarHrefs = [];
    if (calendarType === CalendarType.reflect) {
      const linkHref = urlencode(
        // http://172.30.202.179:3000 http://app.zhennovate.com
        `http://app.zhennovate.com/#/program/detail/${
          typeof program === 'string' ? program : program._id
        }?module_id=${data._id}&paperformKey=${
          RenderPaperformKeyTypes.CompletePFKey
        }`,
      );
      calendarHrefs = calendar.generateCalendars({
        start: new Date(moment().format('YYYY-MM-DD')),
        end: new Date(moment().add(7, 'days').format('YYYY-MM-DD')),
        address: '',
        title: data.Title,
        description:
          '<!DOCTYPE html><html lang="en"><body>' +
          `${data.Detail || ''}` +
          `<a href="${linkHref}">${data.Title}</a>` +
          '</body></html>',
      });
    } else {
      calendarHrefs = calendar.generateCalendars({
        start: new Date(moment().format('YYYY-MM-DD')),
        end: new Date(moment().add(7, 'days').format('YYYY-MM-DD')),
        address: 'The internet',
        title: data.Name,
        description: data.Detail || '',
      });
    }

    const calenderRenderData = [];
    Object.keys(calendarHrefs).forEach((item) => {
      calenderRenderData.push({
        type: item,
        href: calendarHrefs[item],
        icon: calendarIcons[item],
      });
    });
    setCalendarData(calenderRenderData);
  }, [data]);

  const dropMenu = (
    <Menu>
      {calendarData.length > 0 &&
        calendarData.map((item) => {
          return (
            <Menu.Item key={item.type} style={{ height: 56, margin: 0 }}>
              <a
                className={`${prefix}-item`}
                onClick={() => {
                  window.open(item.href);
                  onHide();
                }}
              >
                {item.icon && (
                  <img src={item.icon} style={{ marginRight: 9 }} />
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
