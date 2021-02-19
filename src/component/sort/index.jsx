/**
 * @todo 日期排序组件
 * @Author: centerm.gaohan
 * @Date: 2021-02-05 15:37:04
 * @Last Modified by:   centerm.gaohan
 * @Last Modified time: 2021-02-05 15:37:04
 */
import React, { useState } from 'react';
import '@/pages/index/program/child/index.less';
import { Select } from 'antd';
import moment from 'moment';
import { merge } from 'lodash';

const prefix = 'program-child';

export function sortDataByTimeByNewest(time1, time2, sortKey) {
  /**
   * @param isTime1BeforeTime2 time1 是否在 time2 之前
   */
  const isTime1BeforeTime2 = moment(time1[sortKey]).isBefore(
    moment(time2[sortKey]),
  );

  // 新 - 老
  return isTime1BeforeTime2 ? -1 : 1;
}
export function sortDataByTimeByOldest(time1, time2, sortKey) {
  /**
   * @param isTime1BeforeTime2 time1 是否在 time2 之前
   */
  const isTime1BeforeTime2 = moment(time1[sortKey]).isBefore(
    moment(time2[sortKey]),
  );

  // 老 - 新
  return isTime1BeforeTime2 ? 1 : -1;
}

export const SortSelectValue = {
  Newest: 'Newest',
  Oldest: 'Oldest',
};

function Sort(props) {
  const {
    title,
    titleStyle = {},
    subTitle,
    subTitleStyle = {},
    showSort = true,
    renderSort,
    /**
     * @param setDataSourceHooks 设置数据源的钩子函数
     * @param dataSource 数据源
     * @param setSortKey 用来对比时间的key
     */
    setDataSourceHook = () => {},
    dataSource,
    setSortKey = 'CreateAt',
  } = props;

  /**
   * @param selectValue 排序选中值
   */
  const [selectValue, setSelectValue] = useState(SortSelectValue.Newest);

  const getAfterSortArray = (items) => {
    const data = merge([], items);
    const afterSortData = data.sort(
      selectValue === SortSelectValue.Newest
        ? (a, b) => sortDataByTimeByNewest(a, b, setSortKey)
        : (a, b) => sortDataByTimeByOldest(a, b, setSortKey),
    );
    return afterSortData;
  };

  const sortDataSource = (data) => {
    if (Array.isArray(data)) {
      const afterSortDatasource = getAfterSortArray(data);
      setDataSourceHook(afterSortDatasource);
      return;
    }

    let newData = {};
    for (let key in data) {
      if (data[key]) {
        const currentData = data[key];
        const afterSortDatasource = getAfterSortArray(currentData);
        newData[key] = afterSortDatasource;
      }
    }
    setDataSourceHook(newData);
  };

  const onSelectChange = (value) => {
    setSelectValue(value);
    sortDataSource(dataSource);
  };

  const showSelectComponent = () => {
    if (!showSort) {
      return null;
    }

    const defaultSelectOptions = [
      { label: 'Sort by: Newest to Oldest', value: SortSelectValue.Newest },
      { label: 'Sort by: Oldest to Newest', value: SortSelectValue.Oldest },
    ];

    return (
      <Select
        disabled={dataSource.length === 0}
        value={selectValue}
        onChange={onSelectChange}
        options={defaultSelectOptions}
      />
    );
  };

  return (
    <div className={`${prefix}-sort`}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={`${prefix}-sort-title`} style={titleStyle}>
          {title}
        </div>
        {subTitle && (
          <span
            className={`${prefix}-sort-subtitle`}
            style={{ marginTop: 8, ...subTitleStyle }}
          >
            {subTitle}
          </span>
        )}
      </div>

      {showSelectComponent()}
      {renderSort && renderSort()}
    </div>
  );
}

export default Sort;

export { Sort };
