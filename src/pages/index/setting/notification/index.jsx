import React from 'react';
import '../index.less';
import LearningReminder from './reminder';

const prefix = 'setting';

function Notification() {
  return (
    <div className={`${prefix}-box`}>
      <LearningReminder />
    </div>
  );
}

export default Notification;
