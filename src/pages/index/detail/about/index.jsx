import React from 'react';
import '@/pages/index/program/index.less';

import Detail from '@/pages/index/program/component/detail';
import Instructor from '@/pages/index/program/component/instructor';
import Skill from '@/pages/index/program/component/skill';
import Outcome from '@/pages/index/program/component/outcome';

const prefix = 'page-program';

export default (props) => {
  const { programData } = props;
  return (
    <div
      className={`${prefix}-container-box`}
      style={{ marginLeft: 24, paddingBottom: 100 }}
    >
      <div
        className={`${prefix}-container-left`}
        // ref={programContainerRef}
      >
        <div style={{ width: '100%', height: 32 }} />
        <Detail data={programData} />

        <div style={{ width: '100%', height: 32 }} />
        <Instructor data={programData} />

        <div style={{ width: '100%', height: 32 }} />
        <Skill data={programData} />
        <div style={{ width: '100%', height: 32 }} />
      </div>
      <div className={`${prefix}-container-right`}>
        <div style={{ width: '100%', height: 32 }} />

        <Outcome data={programData} />
      </div>
    </div>
  );
};
