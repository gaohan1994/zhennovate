/**
 * 首页的welcome
 *
 * @Author: centerm.gaohan
 * @Date: 2020-11-30 09:58:42
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-06 16:38:43
 */
import React from 'react';
// import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './index.less';
import Swiper from '@/component/swiper';
import WeeklyGoal from './weekly-goal';
import HomeProgramCard from './card';

function Actions(props) {
  const renderData = (item, index) => {
    if (index === 0) {
      return <WeeklyGoal />;
    }
    return <HomeProgramCard />;
  };

  return (
    <div style={{ marginTop: 32 }}>
      <Swiper
        title="My Actions"
        subTitle="Practice what you’ve learned for mastery"
        height={240}
        width={744}
        data={[[{}, {}]]}
        renderData={renderData}
      />
    </div>
  );
  // return (
  //   <div className={`${prefix}`}>
  //     <div className={`${prefix}-header`} style={{ flexDirection: 'row' }}>
  //       <div className={`${prefix}-header-left`}>
  //         <span className={`${prefix}-header-title`}>My Actions</span>
  //         <span style={{ marginTop: 5 }}>
  //           Practice what you’ve learned for mastery
  //         </span>
  //       </div>

  //       <div className={`${prefix}-bar`}>
  //         <div style={{ marginRight: 13 }}>1 / 1</div>
  //         <div>
  //           <LeftOutlined />
  //           <RightOutlined />
  //         </div>
  //       </div>
  //     </div>

  //     <div className={`${prefix}-bar`}>
  //       <WeeklyGoal />
  //       <div className={`${prefix}-card`}>card</div>
  //     </div>
  //   </div>
  // );
}

export default Actions;
