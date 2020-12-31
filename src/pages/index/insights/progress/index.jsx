import React from 'react';
import '../index.less';
import Sort from '@/component/sort';
import { Progress } from 'antd';
import imgicon from '@/assets/insight-page-icon/Icon_growth_milestone_24x24.svg';

const prefix = 'page-insights';

function GrowthProgress() {
  return (
    <div>
      <Sort
        title="Growth milestone"
        value="1"
        options={[{ label: 'Last 14 days', value: '1' }]}
      />
      <div className={`${prefix}-card`}>
        <div className={`${prefix}-growth-level`}>
          <img src={imgicon} style={{ marginRight: 8 }} />
          Level 3
        </div>
        <Progress strokeColor="#15c3b1" percent={70} />
        <span className={`${prefix}-growth-level-tip`}>
          For every check in, action, and session completed, you will gain point
          towards your growth milestone. Your current goal is 30 points.
        </span>
      </div>
    </div>
  );
}

export default GrowthProgress;
export { GrowthProgress };
