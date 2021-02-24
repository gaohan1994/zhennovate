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

  const timeZoneOffset = new Date().getTimezoneOffset();
  const timeZoneDate =
    timeZoneOffset > 0
      ? moment(weekStart).add(timeZoneOffset / 60, 'hours')
      : moment(weekStart).subtract(timeZoneOffset / 60, 'hours');
  const currentDate = moment(timeZoneDate).format('MMM D');
  const nextWeekDate = moment(timeZoneDate).add(6, 'days').format('MMM D');

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
    const token = getCheckCompleteModalTimeToken();
    if (endCount >= weeklyGoalPlanValue && !token) {
      showWeeklyCompleteModal();
    }
  }, [endCount, weeklyGoalPlanValue]);

  const changeWeeklyGoal = () => {
    try {
      invariant(!!isSign, 'Please sign in.');
      setLoading(true);

      renewactionplan({
        userId,
        count: weeklyGoalValue,
      }).then((result) => {
        if (result.error_code === ResponseCode.success) {
          changeWeeklyGoalValueCallback(weeklyGoalPlanValue, weeklyGoalValue);
          setWeeklyGoalPlanValue(weeklyGoalValue);
          message.success('Weekly goal successfully updated.');
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
                      {weeklyGoalPlanValue > 1 ? 'Actions' : 'Action'}
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
                  {endCount - weeklyGoalPlanValue || 0}
                </span>{' '}
                {endCount - weeklyGoalPlanValue > 1 ? 'actions' : 'action'}
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
        title="Action goal reached!"
        subTitle={
          <>
            <p>You’ve completed your action goal for this week! Yipee! </p>
            <p>Pat yourself on the back for staying on track!</p>
          </>
        }
        confirmButton="Done"
        img="https://media.giphy.com/media/5xaOcLGvzHxDKjufnLW/giphy.gif"
        bodyStyle={{ padding: '20px 32px' }}
        setVisible={toogleWeeklyCompleteModal}
      />

      <Modal
        width={440}
        centered
        title="Edit weekly goal"
        visible={visible}
        onCancel={() => setVisible(false)}
        bodyStyle={{ paddingTop: '18px' }}
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
          <div style={{ marginBottom: 18 }}>
            Pairing insight with action paves the way to success. Set a weekly
            goal to stay action-oriented.
          </div>

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
                label: 'Intentional',
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
