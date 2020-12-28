import React, { useState } from 'react';
import './index.less';
import { Progress, Modal, Button } from 'antd';
import Sort from '@/component/sort';
import Choice from '@/component/choice';
// import moment from 'moment';

const prefix = 'component-home-actions';

function WeeklyGoal() {
  const [visible, setVisible] = useState(false);

  // const currentDate = moment().format('MM/DD');
  // const nextWeekDate = moment().add(7, 'days').format('MM/DD');

  return (
    <div className={`${prefix}-card`} style={{ marginRight: 24 }}>
      <Sort
        title="Weekly Goal"
        titleStyle={{ fontSize: 16 }}
        // subTitle="Nov 6 - Nov 12"
        subTitleStyle={{ fontSize: 12, marginTop: 2, color: '#1b2631' }}
        showSort={false}
      />

      <div className={`${prefix}-content`}>
        <Progress
          type="circle"
          strokeColor="#15c3b1"
          strokeWidth={8}
          strokeLinecap="square"
          percent={25}
          format={(percent, successPercent) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {`${1}/${4}`}
                </span>
                <span style={{ fontSize: 14, color: '#1b2631', marginTop: 8 }}>
                  Actions
                </span>
              </div>
            );
          }}
        />

        <span style={{ marginLeft: 14 }}>
          Complete <span style={{ fontWeight: 'bold' }}>4</span> actions to
          reach your weekly goal.
        </span>
      </div>

      <span
        className={`${prefix}-edit`}
        // onClick={() => setVisible(true)}
        style={{ color: 'gray' }}
      >
        edit
      </span>

      <Modal
        width={440}
        centered
        title="Edit Weekly Action Goal"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => {
              setVisible(false);
            }}
          >
            Save
          </Button>
        }
      >
        <div>
          <span>
            By setting a weekly goal, this helps to be a motivator for you to
            learn more and achieve success.
          </span>

          <Choice
            defaultValue="2"
            onChoice={(value) => {
              console.log('value', value);
            }}
            options={[
              {
                label: 'Casual Learner',
                subTitle: '2 Actions per week',
                value: '1',
              },
              {
                label: 'Casual Learner',
                subTitle: '2 Actions per week',
                value: '2',
              },
              {
                label: 'Casual Learner',
                subTitle: '2 Actions per week',
                value: '3',
              },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}

export default WeeklyGoal;

export { WeeklyGoal };
