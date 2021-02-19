import React from 'react';
// import { UnorderedListOutlined } from '@ant-design/icons';
// import { Button } from 'antd';
import '../index.less';
import Calendar from '@/component/calendar';

const prefix = 'page-detail';

export default (props) => {
  const { data } = props;

  // <UnorderedListOutlined
  //   className={`${prefix}-header-switch`}
  //   onClick={() => setCollapsed((prevCollapse) => !prevCollapse)}
  // />;
  return (
    <div style={{ height: 70, width: '100%' }} className={`${prefix}-header`}>
      <div className={`${prefix}-header-title`}>
        <span>{data.Name}</span>
      </div>
      <div className={`${prefix}-header-buttons`}>
        <Calendar data={data} renderType="modal" />
        {/* 
          <Button>Add to calendar</Button> 
          <Button style={{ marginLeft: 28 }} type="primary" disabled>
            Resume
          </Button>
        */}
      </div>
    </div>
  );
};
