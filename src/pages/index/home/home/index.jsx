/**
 * @Author: centerm.gaohan
 * @Date: 2020-11-30 10:12:22
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-03 11:11:48
 */
import React from 'react';
import Welcome from '../component/welcome';
import Actions from '../component/actions';
import '../../program/child/index.less';
import Sort from '@/component/sort';
import Program from '@/component/program';
import Goal from '../component/goal';

const childPrefix = 'program-child';

function Home(props) {
  return (
    <div className={`${childPrefix}`} style={{ paddingTop: 32 }}>
      <div style={{ marginRight: 24, width: 744 }} className="component-home">
        <Welcome />
        <Actions />

        <div style={{ marginTop: 32 }}>
          <Sort
            title="Programs in Progress"
            subTitle="Continue where you left off"
            showSort={false}
          />
          <Program data={{}} />
        </div>
      </div>
      <div style={{ width: 360 }}>
        <Goal />
      </div>
    </div>
  );
}

export default Home;
