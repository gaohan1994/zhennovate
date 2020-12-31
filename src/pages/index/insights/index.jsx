import React from 'react';
import './index.less';
import InsightTopic from './topic';
import Celebrate from './celebrate';
import Emotion from './emotion';
import Moments from './moments';
import Growth from './growth';
import InsightProgress from './progress';
import Assessment from './assessment';

const prefix = 'page-insights';

function Insights() {
  return (
    <div className={`${prefix}-box `}>
      <div className={`${prefix}-content`}>
        <InsightTopic />
        <Celebrate />
        <Emotion />
        <Moments />
        <InsightProgress />
        <Growth />
        <Assessment />
      </div>
    </div>
  );
}

export default Insights;
export { Insights };
