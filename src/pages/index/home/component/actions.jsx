/**
 * 首页的welcome
 *
 * @Author: centerm.gaohan
 * @Date: 2020-11-30 09:58:42
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-31 15:39:12
 */
import React, { useEffect, useState, useCallback } from 'react';
// import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './index.less';
import Swiper from '@/component/swiper';
import WeeklyGoal from './weekly-goal';
import HomeProgramCard from './card';
import { doingaction } from '../constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { ResponseCode } from '@/common/config';
import { chunk } from 'lodash';
// import useHomeHooks from '../hooks';

const HomeActionTypes = {
  weeklyGoal: 'weeklyGoal',
};

const WeeklyGoalData = {
  type: HomeActionTypes.weeklyGoal,
};

function Actions(props) {
  const { userId } = useSignSdk();
  const homeStore = useSelector((state) => state.homeStore);
  // const {
  //   getCheckCompleteModalTimeToken,
  //   showWeeklyCompleteModal,
  // } = useHomeHooks();

  const [data, setData] = useState({});
  const [swiperData, setSwiperData] = useState([[WeeklyGoalData, {}]]);

  const fetchDoingAction = useCallback(() => {
    doingaction({ userId }).then((result) => {
      if (result.error_code === ResponseCode.success) {
        setData(result.data);
      }
    });
  }, [homeStore]);

  useEffect(() => {
    if (userId) {
      fetchDoingAction();
    }
  }, [userId]);

  // 整理data数据
  useEffect(() => {
    const { doingActions = [] } = data;
    if (doingActions.length > 0) {
      const chunkDataOrigin = [WeeklyGoalData].concat(doingActions);
      const chunkActionsData = chunk(chunkDataOrigin, 2);
      setSwiperData(chunkActionsData);
    } else {
      setSwiperData([[WeeklyGoalData, {}]]);
    }
  }, [data]);

  const renderData = (item, index) => {
    if (item.type === HomeActionTypes.weeklyGoal) {
      return <WeeklyGoal data={data} />;
    }
    return <HomeProgramCard data={item} callback={fetchDoingAction} />;
  };

  return (
    <div style={{ marginTop: 32 }}>
      <Swiper
        title="My Actions"
        subTitle="Practice what you’ve learned for mastery"
        height={240}
        width={744}
        data={swiperData}
        renderData={renderData}
      />
    </div>
  );
}

export default Actions;
