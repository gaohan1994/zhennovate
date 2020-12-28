import React from 'react';
import './index.less';
import imginsights from '../../../assets/insight-page-icon/Girl-Graph.png';

const prefix = 'page-insights';

function Insights() {
  return (
    <div className={`${prefix}-box`}>
      <h1 style={{ marginTop: 50, marginBottom: 50 }}>
        Not available in this Demo
      </h1>
      <img src={imginsights} />
      <h3 style={{ marginTop: 50, marginBottom: 50 }}>
        Here, you would see your mental and behavioral patterns and receive
        personalized coaching tips to help you achieve your goal.
      </h3>
    </div>
  );
}

export default Insights;
export { Insights };
