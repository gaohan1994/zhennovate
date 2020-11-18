import React from 'react';
import './index.less';

const prefix = 'component-empty';

function Empty(props) {
  return (
    <div className={`${prefix}`}>
      <span className={`${prefix}-title`}>No Programs here</span>
      <span>Programs you’ve started will appear here.</span>
    </div>
  );
}

export default Empty;
