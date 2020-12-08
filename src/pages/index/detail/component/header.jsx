import React from 'react';
import { Button } from 'antd';
import '../index.less';
import Calendar from '@/component/calendar';

const prefix = 'page-detail';

export default (props) => {
  const { data } = props;
  return (
    <div style={{ height: 70, width: '100%' }} className={`${prefix}-header`}>
      <div className={`${prefix}-header-title`}>{data.Name}</div>
      <div className={`${prefix}-header-buttons`}>
        <Calendar data={data} renderType="modal" />
        {/* <Button>Add to Calendar</Button> */}
        <Button style={{ marginLeft: 28 }} type="primary">
          Resume
        </Button>
      </div>
    </div>
  );
};
