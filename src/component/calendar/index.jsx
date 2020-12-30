/**
 * 渲染加入日历
 * @Author: centerm.gaohan
 * @Date: 2020-10-23 10:37:31
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-28 11:16:19
 */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Menu } from 'antd';
import calendar from './calendar';
import { capitalize } from 'lodash';
import imgapple from '@/assets/SVG/Icon-AppleCalendar.svg';
import imggoogle from '@/assets/SVG/Icon-GoogleCalendar.svg';
import imgoutlook from '@/assets/Icon-Outlook@2x.png';
import './index.less';
import moment from 'moment';
import urlencode from 'urlencode';
import { RenderPaperformKeyTypes } from '../paperform';

export const CalendarType = {
  normal: 'normal',
  reflect: 'reflect',
};

export const prefix = 'component-calendar';

export const calendarIcons = {
  apple: imgapple,
  google: imggoogle,
  outlook: imgoutlook,
};

/**
 * ```js
 * import Calendar from 'xx';
 *
 * <Calendar
 *  data={{
 *    title: 'hello',
 *    start: new Date(),
 *    end: new Date(),
 *    address: 'new york',
 *    description: 'description
 *  }}
 * />
 * ```
 */
function Calendar(props) {
  const {
    data,
    type = CalendarType.normal,
    program,
    renderType = 'drop',
    render,
  } = props;
  // 是否显示calendar
  const [visible, setVisible] = useState(false);
  // const [dropVisible, setDropVisible] = useState(false);
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    let calendarHrefs = [];
    if (type === CalendarType.reflect) {
      const linkHref = urlencode(
        // http://172.30.202.179:3000 http://app.zhennovate.com
        `http://172.30.202.179:3000/#/program/detail/${
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
          `<a href="${linkHref}">Action Reflect</a>` +
          '</body></html>',
      });
    } else {
      calendarHrefs = calendar.generateCalendars({
        start: new Date(moment().format('YYYY-MM-DD')),
        end: new Date(moment().add(7, 'days').format('YYYY-MM-DD')),
        address: 'The internet',
        title: data.Name,
        description: data.Detail || '',
        // description:
        //   '<html><body><a href="http://www.baidu.com">link</a></body></html>',
        // ...data,
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
              <a target="_blank" href={item.href} className={`${prefix}-item`}>
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
          <Button>Add to Calendar</Button>
        </Dropdown>
      ) : (
        <Button onClick={() => setVisible(true)}>Add to Calendar</Button>
      )}
      <Modal
        width={356}
        centered
        bodyStyle={{ padding: 0 }}
        title="Add to Calendar"
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
