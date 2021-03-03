import React, { useState, useEffect } from 'react';
import '../../index.less';
import { Card, TimePicker, Select } from 'antd';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { getLearningReminder } from '../../constants';

const prefix = 'setting';

function LearningReminder() {
  const { userId } = useSignSdk();

  // const [] = useState();
  const [days] = useState([1, 2, 3]);

  useEffect(() => {
    getLearningReminder({ userId }).then((result) => {
      console.log('result', result);
    });
  }, []);

  const onSubmit = () => {};

  return (
    <Card title="Learning reminder" className={`${prefix}-card`}>
      <p>Choose when to receive your email reminder</p>
      <section>
        <div className={`${prefix}-reminder-times`}>
          <span>Day</span>
          {days.map((item, index) => {
            return (
              <div
                key={index}
                className={`${prefix}-reminder-time`}
                reminder-active={index === 0 ? 'active' : 'normal'}
                common-touch="touch"
              >
                S
              </div>
            );
          })}
        </div>
      </section>
      <p>
        Time
        <TimePicker use12Hours format="h:mm a" style={{ marginLeft: 5 }} />
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
