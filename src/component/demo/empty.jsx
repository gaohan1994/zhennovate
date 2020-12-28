import React from 'react';
import './index.less';
import imgempty from '@/assets/Demo-icon/rising-concept-illustration_114360-930.jpg';

const prefix = 'component-demo';

function DemoEmpty(props) {
  const { img, detail } = props;
  return (
    <div className={`${prefix}-box`}>
      <h1 style={{ marginTop: 30, marginBottom: 30 }}>
        Not available in this Demo
      </h1>
      <img src={img || imgempty} style={{ maxWidth: 620, maxHeight: 420 }} />
      <h3 style={{ marginTop: 30, marginBottom: 30 }}>
        {detail || 'Here, you can continue with the programs you have started.'}
      </h3>
    </div>
  );
}

export { DemoEmpty };
export default DemoEmpty;
