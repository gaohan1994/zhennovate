/**
 * available progress save complete
 * 四个子页面公用页面
 *
 * @Author: centerm.gaohan
 * @Date: 2020-10-22 14:01:43
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-23 09:39:40
 */
import React, { useState, useEffect } from 'react';
import { Select, Card, Checkbox } from 'antd';
import ProgramItem from '@/component/program';
import './index.less';

const prefix = 'program-child';

export default (props) => {
  const { tab } = props;
  // programs数据
  const [programs, setPrograms] = useState([]);
  const [sortValue, setSortValue] = useState('1');

  // 构造假数据
  useEffect(() => {
    const num = Math.floor(Math.random() * 10 + 1) * 2;
    const data = new Array(num).fill({}).map((_, index) => {
      return {
        key: index,
      };
    });
    setPrograms(data);
  }, []);

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

  const renderFilter = () => {
    const checkboxFilter = ['all', 'Category1', 'Category2', 'Category3'];
    return (
      <div className={`${prefix}-filter`}>
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
      <div style={{ marginRight: 24 }}>
        {renderSort()}
        {programs.map((item) => {
          return <ProgramItem key={item.key} />;
        })}
      </div>

      {renderFilter()}
    </div>
  );
};
