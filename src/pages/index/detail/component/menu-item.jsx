import React, { useState, useEffect } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import imguncheck from '@/assets/3.数据录入-2.Radio单选框-亮色-Icon-未选.png';
import '../index.less';

const prefix = 'page-detail';

function MenuItem(props) {
  const { data, finishedModules } = props;
  const [finishedSession, setFinishedSessions] = useState([]);

  useEffect(() => {
    if (finishedModules) {
      setFinishedSessions(finishedModules);
    }
  }, [finishedModules]);

  const isFinished =
    finishedSession &&
    finishedSession.some(
      // eslint-disable-next-line max-nested-callbacks
      (m) => m === data._id,
    );

  return (
    <div className={`${prefix}-menu`}>
      {isFinished ? (
        <div className={`${prefix}-menu-check`}>
          <CheckCircleFilled style={{ color: '#2fc25b' }} />
        </div>
      ) : (
        <div className={`${prefix}-menu-check`}>
          <img src={imguncheck} alt="" />
        </div>
      )}
      <span className={`${prefix}-menu-title`}>{data.Title}</span>
      <span
        className={`${prefix}-menu-desc`}
        style={{ marginTop: 2, fontSize: 12 }}
      >
        {data.Type}
        <span className="dot" />
        {`${data.Duration} min`}
      </span>
    </div>
  );
}

export default MenuItem;
