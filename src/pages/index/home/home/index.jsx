/**
 * @Author: centerm.gaohan
 * @Date: 2020-11-30 10:12:22
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-11-30 16:28:07
 */
import React from 'react';
import Welcome from '../component/welcome';
import Actions from '../component/actions';
import '../../program/child/index.less';

const childPrefix = 'program-child';

function Home(props) {
  return (
    <div className={`${childPrefix}`} style={{ paddingTop: 32 }}>
      <div style={{ marginRight: 24, width: 744 }} className="component-home">
        <Welcome />
        <Actions />
      </div>
      <div style={{ width: 360 }}>right</div>
    </div>
  );
}

export default Home;
