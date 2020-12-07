/**
 * @Author: centerm.gaohan
 * @Date: 2020-11-30 10:12:22
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-07 11:14:32
 */
import React, { useRef } from 'react';
import Welcome from '../component/welcome';
import Actions from '../component/actions';
import '../../program/child/index.less';
import Sort from '@/component/sort';
import Program from '@/component/program';
import Goal from '../component/goal';
import useStickyComponent from '@/component/sticky';

const childPrefix = 'program-child';

function Home(props) {
  const stickyContainer = useRef(null);
  const { isSticky, left } = useStickyComponent(15, stickyContainer);

  return (
    <div className={`${childPrefix}`} style={{ paddingTop: 32 }}>
      <div
        style={{ marginRight: 24, width: 744 }}
        className="component-home"
        ref={stickyContainer}
      >
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
      <div style={{ width: 360, minHeight: 1 }}>
        <Goal
          style={
            isSticky
              ? {
                  position: 'fixed',
                  top: 24 + 64, // 计算距离顶部的高度 加上header
                  left: left + 744 + 24, // 通过program主容器计算 filter 距离左边的距离
                }
              : { position: 'relative' }
          }
        />
      </div>
    </div>
  );
}

export default Home;
