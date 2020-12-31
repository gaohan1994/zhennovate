import React from 'react';
import '../index.less';
import Sort from '@/component/sort';
import { Progress } from 'antd';

const prefix = 'page-insights';

function InsightProgress() {
  return (
    <div>
      <Sort title="Progress" showSort={false} />

      <div className={`${prefix}-card`} style={{ padding: 0 }}>
        <div className={`${prefix}-growth`}>
          <div className={`${prefix}-growth-left`}>
            <div className={`${prefix}-growth-left-item`}>
              <h2>Total check-ins</h2>
              <span>14</span>
              <div className={`${prefix}-growth-left-item-tip`}>
                Last 14 days
              </div>
            </div>
            <div className={`${prefix}-growth-left-item`}>
              <h2>Total check-ins</h2>
              <span>14</span>
              <div className={`${prefix}-growth-left-item-tip`}>
                Last 14 days
              </div>
            </div>
            <div className={`${prefix}-growth-left-item`}>
              <h2>Total check-ins</h2>
              <span>14</span>
              <div className={`${prefix}-growth-left-item-tip`}>
                Last 14 days
              </div>
            </div>
          </div>
          <div className={`${prefix}-growth-right `}>
            <div className={`${prefix}-growth-right-title`}>
              Learning time
              <span style={{ marginLeft: 18 }}>Total time: 1h 50m</span>{' '}
            </div>

            <Sort
              title="Time spent on your learning goals"
              titleStyle={{ fontSize: 16 }}
              showSort={false}
              renderSort={() => {
                return <span style={{ color: '#1890ff' }}>Edit priority</span>;
              }}
            />

            <div className={`${prefix}-growth-progress`}>
              <span>Networking</span>
              <Progress percent={50} />
            </div>

            <div className={`${prefix}-growth-progress`}>
              <span>Networking</span>
              <Progress percent={40} />
            </div>
            <div className={`${prefix}-growth-progress`}>
              <span>Networking</span>
              <Progress percent={30} />
            </div>
            <div className={`${prefix}-growth-progress`}>
              <span>Networking</span>
              <Progress percent={0} />
            </div>
            <Sort
              title="Time spent on your learning goals"
              titleStyle={{ fontSize: 16 }}
              showSort={false}
            />
            <div className={`${prefix}-growth-progress`}>
              <span>Networking</span>
              <Progress percent={10} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightProgress;
export { InsightProgress };
