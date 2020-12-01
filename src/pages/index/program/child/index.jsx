/**
 * available progress save complete
 * 四个子页面公用页面
 *
 * @Author: centerm.gaohan
 * @Date: 2020-10-22 14:01:43
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-01 16:05:36
 */
import React, { useState, useEffect, useRef } from 'react';
import { Select, Card, Checkbox } from 'antd';
import { useScroll } from 'ahooks';
import ProgramItem from '@/component/program';
import Swiper from '../component/swiper';
import './index.less';
import Empty from '@/component/empty';
import useProgramHooks from '../hooks';
import { ProgramTabKeys } from '../constants';

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

  const [category, setCategory] = useState(['']);
  const [selectedCategory, setSelectedCategory] = useState(['']);

  const { top } = useScroll(document);
  const isSticky = top >= 420 + 24 + 24 + 10; // 计算触发sticky的距离

  useEffect(() => {
    if (programContainerRef.current?.offsetLeft) {
      setProgramOffsetLeft(programContainerRef.current.offsetLeft);
    }
  }, [programContainerRef.current]);

  // 构造数据
  useEffect(() => {
    const programkyes = Object.keys(list);
    if (programkyes.length > 0) {
      // 默认全选
      setCategory(programkyes);
      setSelectedCategory(programkyes);
    }
  }, [list]);

  /**
   * 如果切换category则显示对应的数据
   */
  useEffect(() => {
    let renderProgramList = [];

    selectedCategory.forEach((key) => {
      renderProgramList = renderProgramList.concat(list[key]);
    });

    setPrograms(renderProgramList.filter((i) => !!i));
  }, [list, category, selectedCategory]);

  // 设置选中的categroy
  const onChangeCategory = (selectedValues) => {
    setSelectedCategory(selectedValues);
  };

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

            <Checkbox.Group
              onChange={onChangeCategory}
              style={{ width: '100%' }}
            >
              <div className={`${prefix}-filter-checkbox`}>
                {category.length > 0 &&
                  category.map((item) => {
                    const currentCategory = list[item];
                    return (
                      <div
                        key={item}
                        className={`${prefix}-filter-checkbox-item`}
                      >
                        <Checkbox style={{ marginLeft: 0 }} value={item}>
                          <span>{item}</span>
                        </Checkbox>
                        <span>{currentCategory && currentCategory.length}</span>
                      </div>
                    );
                  })}
              </div>
            </Checkbox.Group>
          </div>
        </Card>
      </div>
    );
  };

  if (tab.key === ProgramTabKeys.available) {
    return (
      <div className={`${prefix}-card`}>
        {category.map((cate, cateIndex) => {
          const currentCatePrograms = list[cate];
          if (currentCatePrograms && currentCatePrograms.length > 0) {
            return (
              <Swiper
                key={cate}
                cate={cate}
                cateIndex={cateIndex}
                list={list}
                tab={tab}
              />
            );
          }
          return <div key={cate} />;
        })}
      </div>
    );
  }

  return (
    <div className={`${prefix}`}>
      <div style={{ marginRight: 24 }} ref={programContainerRef}>
        {renderSort()}
        {programs.length > 0 &&
          programs.map((item) => {
            return <ProgramItem key={item?._id} data={item || {}} tab={tab} />;
          })}
        {programs.length === 0 && <Empty tab={tab} />}
      </div>

      {renderFilter()}
      {isSticky && <div style={{ width: 360, height: 1 }} />}
    </div>
  );
};
