import React from 'react';
import '../index.less';
import Sort from '@/component/sort';
import { Progress } from 'antd';
const prefix = 'page-insights';

function Moments() {
  const data = [1, 2, 3];
  return (
    <div className={`${prefix}-card`}>
      <Sort
        title="What to celebrate"
        value="1"
        options={[{ label: 'Last 14 days', value: '1' }]}
      />

      <div className={` ${prefix}-moment`}>
        {data.map((item) => {
          return (
            <div className={`${prefix}-moment-item`} key={item}>
              <Progress
                width={140}
                type="circle"
                strokeColor="#facc14"
                strokeWidth={8}
                strokeLinecap="square"
                percent={25}
                format={(percent, successPercent) => {
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 24, fontWeight: 'bold' }}>
                        25%
                      </span>
                    </div>
                  );
                }}
              />
              <h3>
                <strong>22%</strong> of the time you experience{' '}
                <strong>Happy, Hopeful</strong> when mentioning{' '}
                <strong>friends.</strong>
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Moments;
export { Moments };
