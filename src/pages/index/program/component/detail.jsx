import React from 'react';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import './index.less';

const prefix = 'program-component';

export default (props) => {
  const { data } = props;
  return (
    <Card>
      <div className={`${prefix}-title`}>Program Details</div>
      <ReactMarkdown>{data.Detail}</ReactMarkdown>
    </Card>
  );
};
