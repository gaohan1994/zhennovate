import React from 'react';
import '../index.less';
import Sort from '@/component/sort';
import InsightChart from '../component/chart';

const prefix = 'page-insights';

function Emotion() {
  return (
    <div>
      <Sort title="Understanding your emotions" showSort={false} />
      <div className={`${prefix}-card`}>
        <Sort
          title="Emotions you’ve felt"
          value="1"
          options={[{ label: 'Last 14 days', value: '1' }]}
        />

        <InsightChart />
      </div>
    </div>
  );
}

export default Emotion;
export { Emotion };
