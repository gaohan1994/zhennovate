import React, { useState } from 'react';
import '@/pages/index/program/child/index.less';
import { Select } from 'antd';
import moment from 'moment';

const prefix = 'program-child';

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
    setSortKey = 'create_at',
  } = props;

  function sortDataByTimeByNewest(time1, time2) {
    /**
     * @param isTime1BeforeTime2 time1 是否在 time2 之前
     */
    const isTime1BeforeTime2 = moment(time1[setSortKey]).isBefore(
      moment(time2[setSortKey]),
    );

    // 新 - 老
    return isTime1BeforeTime2 ? -1 : 1;
  }
  function sortDataByTimeByOldest(time1, time2) {
    /**
     * @param isTime1BeforeTime2 time1 是否在 time2 之前
     */
    const isTime1BeforeTime2 = moment(time1[setSortKey]).isBefore(
      moment(time2[setSortKey]),
    );

    // 老 - 新
    return isTime1BeforeTime2 ? 1 : -1;
  }

  /**
   * @param selectValue 排序选中值
   */
  const [selectValue, setSelectValue] = useState(SortSelectValue.Newest);

  const getAfterSortArray = (data) => {
    const afterSortData = data.sort(
      selectValue === SortSelectValue.Newest
        ? sortDataByTimeByNewest
        : sortDataByTimeByOldest,
    );
    // console.log('afterSortData', afterSortData);
    return afterSortData;
  };

  const sortDataSource = (data) => {
    if (Array.isArray(data)) {
      const afterSortDatasource = getAfterSortArray(data);
      // console.log('[afterSortDatasource]', afterSortDatasource);
      setDataSourceHook(afterSortDatasource);
      return;
    }

    let newData = {};
    for (let key in data) {
      if (data[key]) {
        const currentData = data[key];
        const afterSortDatasource = getAfterSortArray(currentData);
        // console.log('[afterSortDatasource]', afterSortDatasource);
        newData[key] = afterSortDatasource;
      }
    }
    // console.log('[newData]', newData);
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
