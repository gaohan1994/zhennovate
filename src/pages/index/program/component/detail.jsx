import React from 'react';
import './index.less';
import Markdown from '@/component/markdown';

// const prefix = 'program-component';

export default (props) => {
  const { data } = props;

  return <Markdown title="Program Details" data={data.Detail} />;
};
