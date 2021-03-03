import React from 'react';
import '../index.less';
import { Card } from 'antd';
import InfomationPassword from './password';

const prefix = 'setting';

function Infomation() {
  return (
    <div className={`${prefix}-box`}>
      <Card title="Account information" className={`${prefix}-card`}>
        infomation
      </Card>
      <InfomationPassword />
    </div>
  );
}

export default Infomation;
