import React from 'react';
import '@/pages/index/program/child/index.less';
import { Select } from 'antd';

const prefix = 'program-child';

function Sort(props) {
  const { title, subTitle, options, value, onChange, showSort = true } = props;
  return (
    <div className={`${prefix}-sort`}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={`${prefix}-sort-title`}>{title}</div>
        {subTitle && (
          <span className={`${prefix}-sort-subtitle`} style={{ marginTop: 8 }}>
            {subTitle}
          </span>
        )}
      </div>

      {showSort && (
        <Select value={value} onChange={onChange} options={options} />
      )}
    </div>
  );
}

export default Sort;

export { Sort };
