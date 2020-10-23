/**
 * 渲染加入日历
 * @Author: centerm.gaohan
 * @Date: 2020-10-23 10:37:31
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-23 11:02:33
 */

import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import calendar from './calendar';

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
export default (props) => {
  const { data } = props;
  // 是否显示calendar
  const [visible, setVisible] = useState(false);
  const [calendarData, setCalendarData] = useState([]);

  /**
   * 点击按钮触发calendar modal
   *
   */
  const onOpenCalendar = () => {
    const calendarHrefs = calendar.generateCalendars({
      ...data,
    });
    console.log('calendarHrefs', calendarHrefs);
    const calenderRenderData = [];
    Object.keys(calendarHrefs).forEach((item) => {
      calenderRenderData.push({
        type: item,
        href: calendarHrefs[item],
      });
    });
    console.log('calenderRenderData', calenderRenderData);
    setCalendarData(calenderRenderData);

    setVisible(true);
  };
  return (
    <div>
      <Button onClick={onOpenCalendar} size="large">
        Add to Calendar
      </Button>

      <Modal
        title="Add to Calendar"
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <div>
          {calendarData.length > 0 &&
            calendarData.map((item) => {
              // 首字母大写
              const type = item.type.replace(
                item.type[0],
                item.type[0].toUpperCase(),
              );
              return (
                <a target="_blank" href={item.href} key={item.type}>
                  {`${type} Calendar`}
                </a>
              );
            })}
        </div>
      </Modal>
    </div>
  );
};
