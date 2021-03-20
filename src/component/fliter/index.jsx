/**
 * @todo
 * 筛选组件
 * @Author: centerm.gaohan
 * @Date: 2021-01-25 12:40:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-25 15:35:45
 */
import React from 'react';
import '@/pages/index/program/child/index.less';
import { Card, Checkbox } from 'antd';
import { merge, pull } from 'lodash';
const prefix = 'program-child';

function Filter(props) {
  const { style = {}, onChange, category, list, selected = [] } = props;
  const checkAllToken = selected.length === category.length;

  /**
   * @param {allCategoryLength} 所有类别的总数
   */
  let allCategoryLength = 0;

  for (let i = 0; i < category.length; i++) {
    const currentListItem = list && list[category[i]];
    if (currentListItem) {
      allCategoryLength += currentListItem.length;
    }
  }

  const onCheckboxChange = (params) => {
    console.log('params', params);
    // 如果只选择了all 那么全选
    // eslint-disable-next-line no-unreachable
    if (params.length === 1 && params[0] === 'All') {
      onChange(category);
      return;
    }

    // 如果用户在全选下 取消选择某项 则去掉这项
    if (params.length > 1 && params.some((p) => p === 'All')) {
      // 如果用户选择了某几项再点击 All 则全选
      if (selected.length < category.length) {
        onChange(category);
        return;
      }
      const nextCategory = merge([], params);
      pull(nextCategory, 'All');
      onChange(nextCategory);
      return;
    }

    // 如果用户在全选下 点击全选则全都不选
    if (
      params.length === category.length &&
      selected.length === category.length
    ) {
      onChange([]);
      return;
    }
    onChange(params);
  };

  return (
    <div className={`${prefix}-filter`} style={style}>
      <Card bodyStyle={{ paddingTop: 16 }}>
        <div className={`${prefix}-filter-card`}>
          <div className={`${prefix}-filter-title`}>Filter by</div>
          <Checkbox.Group
            onChange={onCheckboxChange}
            style={{ width: '100%' }}
            value={checkAllToken ? ['All', ...selected] : selected}
          >
            <div className={`${prefix}-filter-checkbox`}>
              <div className={`${prefix}-filter-checkbox-item`}>
                <Checkbox
                  style={{ marginLeft: 0, marginTop: 16 }}
                  value="All"
                  disabled={category.length === 0}
                >
                  All
                </Checkbox>
                <span>{allCategoryLength}</span>
              </div>
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
}

export default Filter;

export { Filter };
