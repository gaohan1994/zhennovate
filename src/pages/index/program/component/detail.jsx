import React, { useState } from 'react';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import './index.less';

const prefix = 'program-component';

export default (props) => {
  const { data } = props;

  const [status, setStatus] = useState(false);

  return (
    <Card style={{ position: 'relative' }}>
      <div className={`${prefix}-title`}>Program Details</div>
      <div
        className={`${prefix}-markdown ${
          status === false ? `${prefix}-markdown-overflow` : ''
        }`}
      >
        <ReactMarkdown unwrapDisallowed={true}>{data.Detail}</ReactMarkdown>
      </div>

      <div
        className={`${prefix}-markdown-more`}
        onClick={() => setStatus(!status)}
      >
        Show {status === true ? 'less' : 'more'}
      </div>
    </Card>
  );
};
