/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import './index.less';
import { Progress, Modal, Button, message, Spin } from 'antd';
import Sort from '@/component/sort';
import Choice from '@/component/choice';
import { useSelector } from 'react-redux';
import { renewactionplan } from '../constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import invariant from 'invariant';
import { ResponseCode } from '@/common/config';
import PaperformActionModal from '@/component/paperform/component/modal';
import useHomeHooks from '../hooks';
import moment from 'moment';

const prefix = 'component-home-actions';

function WeeklyGoal(props) {
  const { data = {} } = props;
  const homeStore = useSelector((state) => state.homeStore);
  // console.log('homeStore', homeStore);
  const { endCount, planEndCount, weekStart } = data;
  const { isSign, userId } = useSignSdk();
  const [visible, setVisible] = useState(false);
  /**
   * @param loading 是否加载中
   */
  const [loading, setLoading] = useState(false);

  const {
    // homeStore,
    toogleWeeklyCompleteModal,
    showWeeklyCompleteModal,
    getCheckCompleteModalTimeToken,
    changeWeeklyGoalValueCallback,
  } = useHomeHooks();

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

  const currentDate = moment(weekStart).format('MMM D');
  const nextWeekDate = moment(weekStart).add(6, 'days').format('MMM D');

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
    if (weeklyGoalPlanValue === 0) {
      return;
    }
    const p = ((endCount || 0) / (weeklyGoalPlanValue || 0)) * 100;
    setPercent(p);

    console.log('endCount', endCount);
    console.log('weeklyGoalPlanValue', weeklyGoalPlanValue);
    console.log(
      'endCount >= weeklyGoalPlanValue',
      endCount >= weeklyGoalPlanValue,
    );
    const token = getCheckCompleteModalTimeToken();
    console.log('token', token);
    if (endCount >= weeklyGoalPlanValue && !token) {
      showWeeklyCompleteModal();
    }
  }, [endCount, weeklyGoalPlanValue]);

  const changeWeeklyGoal = () => {
    try {
      invariant(!!isSign, 'Please Sign-in');
      setLoading(true);

      renewactionplan({
        userId,
        count: weeklyGoalValue,
      }).then((result) => {
        if (result.error_code === ResponseCode.success) {
          changeWeeklyGoalValueCallback(weeklyGoalPlanValue, weeklyGoalValue);
          setWeeklyGoalPlanValue(weeklyGoalValue);
          message.success('Weekly Goal Successfully Updated.');
        }

        setLoading(false);
      });
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Spin spinning={loading}>
        <div className={`${prefix}-card`} style={{ marginRight: 24 }}>
          <Sort
            title="Weekly goal"
            titleStyle={{ fontSize: 16 }}
            subTitle={`${currentDate} - ${nextWeekDate}`}
            subTitleStyle={{
              fontSize: 12,
              marginTop: 2,
              color: '#1b2631',
              fontStyle: 'italic',
            }}
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
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#1b2631',
                      }}
                    >
                      {`${endCount || 0}/${weeklyGoalPlanValue || 0}`}
                    </span>
                    <span
                      style={{ fontSize: 14, color: '#1b2631', marginTop: 8 }}
                    >
                      Actions
                    </span>
                  </div>
                );
              }}
            />

            {endCount < weeklyGoalPlanValue ? (
              <span style={{ marginLeft: 14 }}>
                Complete{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {weeklyGoalPlanValue - endCount}
                </span>{' '}
                actions to
                <br />
                reach your weekly goal.
              </span>
            ) : endCount === weeklyGoalPlanValue ? (
              <span style={{ marginLeft: 14 }}>
                You’ve reached your goal for this week!
              </span>
            ) : (
              <span style={{ marginLeft: 14 }}>
                You've achieved{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {endCount - weeklyGoalPlanValue}
                </span>{' '}
                actions
                <br />
                beyond your goal this week!
              </span>
            )}
          </div>

          <span
            className={`${prefix}-edit`}
            onClick={() => setVisible(true)}
            common-touch="touch"
          >
            edit
          </span>
        </div>
      </Spin>

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
        title="Edit Weekly goal"
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
            Set weekly goal to deepen your learning through the cycle of
            experimenting with new actions and reflection.
          </span>

          <Choice
            defaultValue={weeklyGoalValue}
            onChoice={setWeeklyGoalValue}
            options={[
              {
                label: 'Casual',
                subTitle: '1 action per week',
                value: 1,
              },
              {
                label: '  Intentional',
                subTitle: '2 actions per week',
                value: 2,
              },
              {
                label: 'Upbeat',
                subTitle: '3 actions per week',
                value: 3,
              },

              {
                label: 'Warrior',
                subTitle: '5 actions per week',
                value: 5,
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
