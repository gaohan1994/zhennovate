/**
 * available progress save complete
 * 四个子页面公用页面
 *
 * @Author: centerm.gaohan
 * @Date: 2020-10-22 14:01:43
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-06 14:30:35
 */
import React, { useState, useEffect, useRef } from 'react';
// import { useScroll } from 'ahooks';
import ProgramItem from '@/component/program';
import Swiper from '../component/swiper';
import './index.less';
import Empty from '@/component/empty';
import useProgramHooks from '../hooks';
import { ProgramTabKeys } from '../constants';
import Filter from '@/component/fliter';
import Sort from '@/component/sort';
import useStickyComponent from '@/component/sticky';
import DemoEmpty from '@/component/demo/empty';
import imgsave from '@/assets/Demo-icon/woman-sitting-office-desk-holding-pen-while-thinking_10045-492.jpg';
import imgcomplete from '@/assets/Demo-icon/completed-concept-illustration_114360-3891.jpg';
// import imgsave from '@/assets/Demo-icon/woman-sitting-office-desk-holding-pen-while-thinking_10045-492.png';

const prefix = 'program-child';

export default (props) => {
  const { tab } = props;
  const { list } = useProgramHooks(tab.key);

  const [isDemo] = useState(false);

  // programs的容器
  const programContainerRef = useRef(null);
  // programs数据
  const [programs, setPrograms] = useState([]);
  // sort值
  const [sortValue, setSortValue] = useState('1');
  // program容器距离左边的距离
  // const [programOffsetLeft, setProgramOffsetLeft] = useState(-1);

  const [category, setCategory] = useState(['']);
  const [selectedCategory, setSelectedCategory] = useState(['']);

  // const { top } = useScroll(document);
  // const isSticky = top >= 420 + 24 + 24 + 10; // 计算触发sticky的距离

  const { left, isSticky } = useStickyComponent(
    420 + 24 + 24 + 10,
    programContainerRef,
  );

  // useEffect(() => {
  //   if (programContainerRef.current?.offsetLeft) {
  //     setProgramOffsetLeft(programContainerRef.current.offsetLeft);
  //   }
  // }, [programContainerRef.current]);

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
      <Sort
        title={tab.tab}
        value={sortValue}
        onChange={setSortValue}
        options={[{ label: 'Sort by: Newest to oldest', value: '1' }]}
      />
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
      <Filter
        category={category}
        list={list}
        onChange={onChangeCategory}
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
      {isDemo ? (
        <DemoEmpty
          img={
            tab.key === ProgramTabKeys.save
              ? imgsave
              : tab.key === ProgramTabKeys.complete
              ? imgcomplete
              : null
          }
          detail={
            tab.key === ProgramTabKeys.save
              ? "Here, you can visit the programs you've saved for later."
              : tab.key === ProgramTabKeys.complete
              ? 'Here, you can visit the programs you have completed.'
              : ''
          }
        />
      ) : (
        <>
          <div style={{ marginRight: 24 }} ref={programContainerRef}>
            {renderSort()}
            {programs.length > 0 &&
              programs.map((item) => {
                return (
                  <ProgramItem key={item?._id} data={item || {}} tab={tab} />
                );
              })}
            {programs.length === 0 && <Empty tab={tab} />}
          </div>

          {renderFilter()}
          {isSticky && <div style={{ width: 360, height: 1 }} />}
        </>
      )}
    </div>
  );
};
