import React from 'react';
import Sort from '@/component/sort';
import '../index.less';
import moment from 'moment';

const prefix = 'page-insights';

function InsightTopic() {
  const lastUpdateDate = moment().format('MMM DD, YYYY');

  return (
    <div>
      <Sort title="Insights by topic" showSort={false} />

      <div className={`${prefix}-card`}>
        <Sort
          title="What to work on"
          subTitle={`Last Updated ${lastUpdateDate}`}
          value="1"
          options={[{ label: 'Topic: Confidence', value: '1' }]}
        />

        <div className={`${prefix}-container`}>
          <div className={`${prefix}-topic`}>
            <p>
              <span>Insights Insights Insights Insights </span>
              <h3>
                Insights Insights Insights Insights Insights Insights Insights
                Insights
              </h3>
            </p>
            <p>
              <span>Insights Insights </span>
              <h3>Insights Insights Insights</h3>
            </p>
            <p>
              <span>Insights Insights Insights Insights </span>
              <h3>Insights</h3>
            </p>
          </div>
          <div
            className={`${prefix}-topic ${prefix}-container`}
            style={{ marginLeft: 250, flex: 1 }}
          >
            <div className={`${prefix}-topic-card ${prefix}-topic-card-bg`}>
              <h4 style={{ marginBottom: 24 }}>Try This</h4>
              <p>14-day program to overcome reluctance when asking for help</p>
              <span className={`${prefix}-topic-card-tip`}>
                Recommended for <strong>Asking for help</strong>
              </span>
            </div>
            <div className={`${prefix}-topic-card ${prefix}-topic-card-bg`}>
              <h4 style={{ marginBottom: 24 }}>Try This</h4>
              <p>Map out a custom self-care strategy with a coach</p>
              <span className={`${prefix}-topic-card-tip`}>
                Recommended for <strong>Asking for help</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightTopic;
export { InsightTopic };
