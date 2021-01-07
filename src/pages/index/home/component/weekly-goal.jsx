import React, { useState, useEffect } from 'react';
import './index.less';
import { Progress, Modal, Button, message } from 'antd';
import Sort from '@/component/sort';
import Choice from '@/component/choice';
import { renewactionplan } from '../constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import invariant from 'invariant';
import { ResponseCode } from '@/common/config';
import PaperformActionModal from '@/component/paperform/component/modal';
import useHomeHooks from '../hooks';
// import moment from 'moment';

const prefix = 'component-home-actions';

function WeeklyGoal(props) {
  const { data = {} } = props;
  const { endCount, planEndCount } = data;
  const { isSign, userId } = useSignSdk();
  const [visible, setVisible] = useState(false);

  const { homeStore, toogleWeeklyCompleteModal } = useHomeHooks();

  /**
   * @param weeklyGoalValue modal 里面显示的数量
   */
  const [weeklyGoalValue, setWeeklyGoalValue] = useState(0);
  /**
   * @param weeklyGoalPlanValue 进度条和文字中的分母数量
   */
  const [weeklyGoalPlanValue, setWeeklyGoalPlanValue] = useState(0);

  /**
   * @param percent 进度条
   */
  const [percent, setPercent] = useState(0);

  // const currentDate = moment().format('MM/DD');
  // const nextWeekDate = moment().add(7, 'days').format('MM/DD');

  useEffect(() => {
    if (planEndCount) {
      setWeeklyGoalValue(planEndCount);
      setWeeklyGoalPlanValue(planEndCount);
    }
  }, [planEndCount]);

  /**
   * 计算如果做完了action则弹出弹出框庆祝
   */
  useEffect(() => {
    const p = ((endCount || 0) / (weeklyGoalPlanValue || 0)) * 100;
    setPercent(p);
  }, [endCount, weeklyGoalPlanValue]);

  const changeWeeklyGoal = () => {
    try {
      invariant(!!isSign, 'Please Sign-in');

      if (weeklyGoalValue !== planEndCount) {
        renewactionplan({
          userId,
          count: weeklyGoalValue,
        }).then((result) => {
          if (result.error_code === ResponseCode.success) {
            console.log('result', result);
            setWeeklyGoalPlanValue(weeklyGoalValue);
            message.success('Weekly Action Goal Changed!');
          }
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  };

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
          percent={percent}
          format={(percent, successPercent) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {`${endCount || 0}/${weeklyGoalPlanValue || 0}`}
                </span>
                <span style={{ fontSize: 14, color: '#1b2631', marginTop: 8 }}>
                  Actions
                </span>
              </div>
            );
          }}
        />

        <span style={{ marginLeft: 14 }}>
          Complete{' '}
          <span style={{ fontWeight: 'bold' }}>{weeklyGoalPlanValue || 0}</span>{' '}
          actions to reach your weekly goal.
        </span>
      </div>

      <span className={`${prefix}-edit`} onClick={() => setVisible(true)}>
        edit
      </span>

      <PaperformActionModal
        visible={homeStore.weeklyCompleteModalVisible}
        title="Action Goal Reached!"
        subTitle="You’ve completed your action goal for this week! Yipee! Pat yourself on the back for staying on track!"
        confirmButton="Done"
        img="https://media.giphy.com/media/5xaOcLGvzHxDKjufnLW/giphy.gif"
        bodyStyle={{ padding: '20px 32px' }}
        setVisible={toogleWeeklyCompleteModal}
      />

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
              changeWeeklyGoal();
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
            defaultValue={weeklyGoalValue}
            onChoice={setWeeklyGoalValue}
            options={[
              {
                label: 'Casual Learner',
                subTitle: '2 Actions per week',
                value: 2,
              },
              {
                label: 'Casual Learner',
                subTitle: '4 Actions per week',
                value: 4,
              },
              {
                label: 'Casual Learner',
                subTitle: '6 Actions per week',
                value: 6,
              },

              {
                label: 'Casual Learner',
                subTitle: '8 Actions per week',
                value: 8,
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
