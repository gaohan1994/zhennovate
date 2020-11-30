/**
 * @Author: centerm.gaohan
 * @Date: 2020-11-30 10:12:22
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-11-30 10:15:21
 */
import React from 'react';
import Welcome from '../component/welcome';
import '../../program/child/index.less';

const childPrefix = 'program-child';

function Home(props) {
  return (
    <div className={`${childPrefix}`} style={{ paddingTop: 32 }}>
      <div style={{ marginRight: 24, width: 744 }}>
        <Welcome />
      </div>
      <div style={{ width: 360 }}>right</div>
    </div>
  );
}

export default Home;
