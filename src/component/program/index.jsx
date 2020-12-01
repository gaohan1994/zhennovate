/**
 * program item 组件
 * @Author: centerm.gaohan
 * @Date: 2020-10-22 14:13:33
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-01 16:34:53
 */
import React from 'react';
import { Progress } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.less';
// import imgbooksaved from '@/assets/Icon-Bookmark-Solid.png';
import imgbookunsave from '@/assets/Icon-Bookmark-outline@2x.png';

const prefix = 'component-program';

export default (props) => {
  const { data, tab, type, style = {} } = props;
  const history = useHistory();

  const onClick = () => {
    history.push(
      `/program/describe/${data._id}${tab ? `?entry=${tab.key}` : ''}`,
    );
  };

  // 点击保存、取消保存 阻止冒泡
  const onSave = (e) => {
    e.stopPropagation();
  };

  if (type === 'card') {
    return (
      <div className={`${prefix}-card`} style={{ ...style }} onClick={onClick}>
        <div
          className={`${prefix}-card-cover`}
          style={{ backgroundImage: `url(${data.Cover})` }}
        />
        <div className={`${prefix}-card-detail`}>
          <span className={`${prefix}-card-title`}>
            {data.Name}
            {data.Name}
            {data.Name}
          </span>
          <span style={{ marginTop: 12 }}>By Coach Name Written here</span>
          <span style={{ marginTop: 12 }}>
            {data.Sessions?.length || 0} sessions 3hrs
          </span>

          <div
            className={`${prefix}-content-save`}
            style={{ backgroundImage: `url(${imgbookunsave})` }}
            onClick={onSave}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${prefix} ${prefix}-fix`}
      onClick={onClick}
      style={{ ...style }}
    >
      <div
        className={`${prefix}-cover`}
        style={{ backgroundImage: `url(${data.Cover})` }}
      />
      <div className={`${prefix}-content`}>
        <span>{data.Sessions?.length || 0} sessions</span>

        <span className={`${prefix}-content-title`}>{data.Name}</span>

        <span className={`${prefix}-content-status`}>Completed</span>

        <div className={`${prefix}-content-progress`}>
          <Progress percent={100} showInfo={false} />
        </div>

        <div
          className={`${prefix}-content-save`}
          style={{ backgroundImage: `url(${imgbookunsave})` }}
          onClick={onSave}
        />
      </div>
    </div>
  );
};
