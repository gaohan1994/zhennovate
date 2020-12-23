import React, { useEffect } from 'react';
import Sort from '@/component/sort';
import Empty from '@/component/empty';
import { ProgramTabKeys } from '../../program/constants';
// import Program from '@/component/program';

function HomePrograms() {
  useEffect(() => {}, []);
  return (
    <div style={{ marginTop: 32 }}>
      <Sort
        title="Programs in Progress"
        subTitle="Continue where you left off"
        showSort={false}
      />
      {/* <Program data={{}} /> */}
      <Empty tab={{ key: ProgramTabKeys.progress }} />
    </div>
  );
}

export default HomePrograms;
