import React from 'react';
import '../index.less';
// import Account from './account';
import InfomationPassword from './password';

const prefix = 'setting';

function Infomation() {
  return (
    <div className={`${prefix}-box`}>
      {/* <Account /> */}
      <InfomationPassword />
    </div>
  );
}

export default Infomation;
