import React, { useState } from 'react';
import '../../index.less';
import { Card } from 'antd';

const prefix = 'setting';

function LearningReminder() {
  const [days] = useState([1, 2, 3]);

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
      <p>Time 可以使用antd的timepicker么？</p>

      <h3 className={`${prefix}-card-save`} common-touch="touch">
        Save
      </h3>
    </Card>
  );
}

export default LearningReminder;
