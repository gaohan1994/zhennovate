import React, { useState, useEffect } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import imguncheck from '@/assets/Icon_CoachingPath_Empty_36x36.svg';
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
          <img src={imguncheck} alt="" style={{ width: 12, height: 12, maxWidth: 12, maxHeight: 12}} />
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
