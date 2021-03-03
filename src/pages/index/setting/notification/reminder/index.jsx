import React, { useState, useEffect } from 'react';
import '../../index.less';
import { Card, TimePicker, Select, message } from 'antd';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { getLearningReminder, setLearningReminder } from '../../constants';
import { ResponseCode } from '@/common/config';
import moment from 'moment';
import { merge } from 'lodash';

const prefix = 'setting';

function pt(s) {
  return s < 10 ? '0' + s : s;
}

const weekDays = [
  { value: 1, name: 'Sunday' },
  { value: 2, name: 'Monday' },
  { value: 3, name: 'Tuesday' },
  { value: 4, name: 'Wednesday' },
  { value: 5, name: 'Thursday' },
  { value: 6, name: 'Friday' },
  { value: 7, name: 'Saturday' },
];

function LearningReminder() {
  const format = 'hh:mm A';
  const { userId } = useSignSdk();

  const [timeValue, setTimeValue] = useState(undefined);
  const [data, setData] = useState({});
  const [dayWeek, setDayWeek] = useState([]);

  useEffect(() => {
    if (userId) {
      getLearningReminder({ userId }).then((result) => {
        if (result.error_code === ResponseCode.success) {
          setData(result.data);
          setDayWeek(result.data.dayWeek);
        }
      });
    }
  }, [userId]);

  useEffect(() => {
    if (data && data.hour) {
      setTimeValue(moment(`${pt(data.hour)}:${pt(data.minute)}`, format));
    }
  }, [data]);

  const onSubmit = () => {
    const timeZoneOffsetMinutes = new Date().getTimezoneOffset();

    const payload = {
      userId: userId,
      hour: moment(timeValue).hour(),
      minute: moment(timeValue).minute(),
      dayWeek: dayWeek,
      zoneOffset: timeZoneOffsetMinutes / 60,
    };

    console.log('payload', payload);

    setLearningReminder({ userId }, payload).then((result) => {
      if (result.error_code === ResponseCode.success) {
        message.success('Your changes were saved.');
      } else {
        message.error(result.message || ' ');
      }
    });
  };

  const onWeekClick = (item) => {
    const isSelected = dayWeek.some((d) => d === item.value);
    let nextDayWeek = merge([], dayWeek);
    if (isSelected) {
      const index = dayWeek.findIndex((d) => d === item.value);
      nextDayWeek.splice(index, 1);
      setDayWeek(nextDayWeek);
    } else {
      nextDayWeek.push(item.value);
      setDayWeek(nextDayWeek);
    }
  };

  return (
    <Card title="Learning reminder" className={`${prefix}-card`}>
      <p>Choose when to receive your email reminder</p>
      <section>
        <div className={`${prefix}-reminder-times`}>
          <span>Day</span>
          {weekDays.map((item) => {
            const selectedDays =
              dayWeek && dayWeek.some((d) => d === item.value);
            return (
              <div
                key={item.value}
                className={`${prefix}-reminder-time`}
                reminder-active={selectedDays ? 'active' : 'normal'}
                common-touch="touch"
                onClick={() => onWeekClick(item)}
              >
                {item.name.substr(0, 1)}
              </div>
            );
          })}
        </div>
      </section>
      <p>
        Time
        <TimePicker
          // use12Hours
          value={timeValue}
          onChange={setTimeValue}
          format={format}
          style={{ marginLeft: 5 }}
        />
        <Select placeholder="Time Zone" style={{ marginLeft: 5 }}>
          <Select.Option>time zone 1</Select.Option>
        </Select>
      </p>

      <h3
        className={`${prefix}-card-save`}
        common-touch="touch"
        onClick={onSubmit}
      >
        Save
      </h3>
    </Card>
  );
}

export default LearningReminder;
