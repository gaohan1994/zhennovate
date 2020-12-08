/**
 * 渲染加入日历
 * @Author: centerm.gaohan
 * @Date: 2020-10-23 10:37:31
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-08 14:37:24
 */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Menu } from 'antd';
import calendar from './calendar';
import { capitalize } from 'lodash';
import imgapple from '@/assets/SVG/Icon-AppleCalendar.svg';
import imggoogle from '@/assets/SVG/Icon-GoogleCalendar.svg';
import './index.less';
import moment from 'moment';

const prefix = 'component-calendar';

const calendarIcons = {
  apple: imgapple,
  google: imggoogle,
  outlook: imgapple,
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
  const { data, renderType = 'drop' } = props;
  // console.log('data', data);
  // 是否显示calendar
  const [visible, setVisible] = useState(false);
  // const [dropVisible, setDropVisible] = useState(false);
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const calendarHrefs = calendar.generateCalendars({
      start: new Date(moment().format('YYYY-MM-DD')),
      end: new Date(moment().add(7, 'days').format('YYYY-MM-DD')),
      address: 'The internet',
      title: data.Name,
      description: data.Detail || '',
      // description:
      //   '<html><body><a href="http://www.baidu.com">link</a></body></html>',
      // ...data,
    });

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
      {renderType === 'drop' ? (
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
