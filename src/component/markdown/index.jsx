import React, { useState } from 'react';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import '@/pages/index/program/component/index.less';

const prefix = 'program-component';

function Markdown(props) {
  const { data, title, renderHeader, children } = props;

  const [status, setStatus] = useState(false);

  return (
    <Card style={{ position: 'relative' }}>
      {renderHeader ? (
        renderHeader()
      ) : title ? (
        <div className={`${prefix}-title`}>{title}</div>
      ) : null}

      {data && (
        <div
          className={`${prefix}-markdown ${
            status === false ? `${prefix}-markdown-overflow` : ''
          }`}
        >
          <ReactMarkdown unwrapDisallowed={true}>{data}</ReactMarkdown>
        </div>
      )}

      {children && (
        <div
          className={`${prefix}-markdown ${
            status === false ? `${prefix}-markdown-overflow` : ''
          }`}
        >
          {children}
        </div>
      )}

      <div
        className={`${prefix}-markdown-more`}
        onClick={() => setStatus(!status)}
      >
        Show {status === true ? 'less' : 'more'}
      </div>
    </Card>
  );
}

export default Markdown;

export { Markdown };
