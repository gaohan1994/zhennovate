/**
 * Workshop
 * upcoming recording saved
 * 子页面公用页面
 *
 * @Author: centerm.gaohan
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-08 14:19:53
 */
import React, { useState, useEffect, useRef } from 'react';
import ProgramItem from '@/component/program';
import '/index.less';
import Empty from '@/component/empty';
import useProgramHooks from '../hooks';
import Filter from '@/component/fliter';
import Sort from '@/component/sort';
import useStickyComponent from '@/component/sticky';
// import { WorkshopTabKeys } from '../constants';
// import imgsave from '@/assets/Demo-icon/woman-sitting-office-desk-holding-pen-while-thinking_10045-492.jpg';
// import imgcomplete from '@/assets/Demo-icon/completed-concept-illustration_114360-3891.jpg';
// import imgsave from '@/assets/Demo-icon/woman-sitting-office-desk-holding-pen-while-thinking_10045-492.png';

const prefix = 'program-child';

export default (props) => {
  const { tab } = props;
  const { list, fieldSaved } = useProgramHooks(tab.key);

  // programs的容器
  const uiContainerRef = useRef(null);
  // programs数据
  const [programs, setPrograms] = useState([]);
  // program容器距离左边的距离
  // const [programOffsetLeft, setProgramOffsetLeft] = useState(-1);

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(['']);

  // const { top } = useScroll(document);
  // const isSticky = top >= 420 + 24 + 24 + 10; // 计算触发sticky的距离

  const { left, isSticky } = useStickyComponent(
    420 + 24 + 24 + 10,
    uiContainerRef,
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
        dataSource={programs}
        setDataSourceHook={setPrograms}
      />
    );
  };

  /**
   *
   * 渲染filter 这里超过一定距离要固定定位
   * @return {*}
   */
  // eslint-disable-next-line no-unused-vars
  const renderFilter = () => {
    // 是否固定
    return (
      <Filter
        category={category}
        list={list}
        onChange={onChangeCategory}
        selected={selectedCategory}
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

  return (
    <div className={`${prefix}`}>
      <div style={{ marginRight: 24 }} ref={uiContainerRef}>
        {renderSort()}
        {programs.length > 0 &&
          programs.map((item) => {
            return (
              <ProgramItem
                key={item?._id}
                data={item || {}}
                tab={tab}
                fieldSaved={fieldSaved}
              />
            );
          })}
        {programs.length === 0 && <Empty tab={tab} />}
      </div>

      {/* {renderFilter()} */}
      {/* {isSticky && <div style={{ width: 360, height: 1 }} />} */}
    </div>
  );
};
