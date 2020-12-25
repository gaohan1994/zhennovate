import React from 'react';
import './index.less';
import imggoal from '@/assets/Icon-Action@2x.png';

const prefix = 'component-card';

function Card(props) {
  const { title, subTitle, tip, children, width = 550, height = 300 } = props;
  return (
    <div className={`${prefix}-card ${prefix}-empty`} style={{ width, height }}>
      {tip && <span style={{ marginBottom: 12 }}>{tip}</span>}
      <div
        className={`${prefix}-icon`}
        style={{ backgroundImage: `url(${imggoal})`, marginRight: 16 }}
      />
      <div
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          marginTop: 12,
          lineHeight: 1.2,
        }}
        className={`${prefix}-title`}
      >
        {title}
      </div>
      <div style={{ marginTop: 12, textAlign: 'center' }}>{subTitle}</div>
      {children}
    </div>
  );
}

export default Card;

export { Card };
