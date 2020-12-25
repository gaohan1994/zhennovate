import React, { useState } from 'react';
import { Card } from 'antd';
import '@/pages/index/program/component/index.less';

const prefix = 'program-component';

function ShowMore(props) {
  const { title, renderHeader, children } = props;

  const [status, setStatus] = useState(false);

  return (
    <Card style={{ position: 'relative' }}>
      {renderHeader ? (
        renderHeader()
      ) : title ? (
        <div className={`${prefix}-title`}>{title}</div>
      ) : null}

      <div
        className={`${prefix}-markdown ${
          status === false ? `${prefix}-markdown-overflow` : ''
        }`}
      >
        {children && children(status)}
      </div>

      <div
        className={`${prefix}-markdown-more`}
        onClick={() => setStatus(!status)}
      >
        Show {status === true ? 'less' : 'more'}
      </div>
    </Card>
  );
}

export default ShowMore;

export { ShowMore };
