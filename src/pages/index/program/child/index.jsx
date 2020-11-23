/**
 * available progress save complete
 * 四个子页面公用页面
 *
 * @Author: centerm.gaohan
 * @Date: 2020-10-22 14:01:43
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-11-23 10:47:47
 */
import React, { useState, useEffect, useRef } from 'react';
import { Select, Card, Checkbox } from 'antd';
import { useScroll } from 'ahooks';
import ProgramItem from '@/component/program';
// import invariant from 'invariant';
// import { availableList } from '../constants';
import './index.less';
import Empty from '@/component/empty';
import useProgramHooks from '../hooks';

const prefix = 'program-child';

export default (props) => {
  const { tab } = props;
  const { list } = useProgramHooks(tab.key);

  // programs的容器
  const programContainerRef = useRef(null);
  // programs数据
  const [programs, setPrograms] = useState([]);
  // sort值
  const [sortValue, setSortValue] = useState('1');
  // program容器距离左边的距离
  const [programOffsetLeft, setProgramOffsetLeft] = useState(-1);

  const { top } = useScroll(document);
  const isSticky = top >= 420 + 24 + 24 + 10; // 计算触发sticky的距离

  useEffect(() => {
    if (programContainerRef.current?.offsetLeft) {
      setProgramOffsetLeft(programContainerRef.current.offsetLeft);
    }
  }, [programContainerRef.current]);

  // 构造假数据
  useEffect(() => {
    setPrograms(list);
  }, [list]);

  // 渲染列表头部
  const renderSort = () => {
    return (
      <div className={`${prefix}-sort`}>
        <div className={`${prefix}-sort-title`}>{tab.tab}</div>
        <Select value={sortValue} onChange={setSortValue}>
          <Select.Option value="1">Sort by: Newest to oldest</Select.Option>
        </Select>
      </div>
    );
  };

  /**
   *
   * 渲染filter 这里超过一定距离要固定定位
   * @return {*}
   */
  const renderFilter = () => {
    // 是否固定

    const checkboxFilter = ['all', 'Category1', 'Category2', 'Category3'];
    return (
      <div
        className={`${prefix}-filter`}
        style={
          isSticky
            ? {
                position: 'fixed',
                top: 24 + 64, // 计算距离顶部的高度 加上header
                left: programOffsetLeft + 744 + 24, // 通过program主容器计算 filter 距离左边的距离
              }
            : { position: 'relative' }
        }
      >
        <Card bodyStyle={{ paddingTop: 16 }}>
          <div className={`${prefix}-filter-card`}>
            <div className={`${prefix}-filter-title`}>Filter by</div>

            <div className={`${prefix}-filter-checkbox`}>
              {checkboxFilter.map((item) => {
                return (
                  <div key={item} className={`${prefix}-filter-checkbox-item`}>
                    <Checkbox style={{ marginLeft: 0 }}>
                      <span>{item}</span>
                    </Checkbox>
                    <span>#</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className={`${prefix}`}>
      <div style={{ marginRight: 24 }} ref={programContainerRef}>
        {renderSort()}
        {programs.map((item) => {
          return <ProgramItem key={item._id} data={item} tab={tab} />;
        })}
        {programs.length === 0 && <Empty />}
      </div>

      {renderFilter()}
      {isSticky && <div style={{ width: 360, height: 1 }} />}
    </div>
  );
};
