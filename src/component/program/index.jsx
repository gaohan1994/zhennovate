/**
 * program item 组件
 * @Author: centerm.gaohan
 * @Date: 2020-10-22 14:13:33
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-22 15:15:54
 */
import React from 'react';
import { Progress } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.less';

const prefix = 'component-program';

export default (props) => {
  const history = useHistory();
  const onClick = () => {
    history.push(`/program/describe/5f8c2a3a70ed180c2e8e7bd4`);
  };

  // 点击保存、取消保存 阻止冒泡
  const onSave = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`${prefix} ${prefix}-fix`} onClick={onClick}>
      <div className={`${prefix}-cover`}>cover</div>
      <div className={`${prefix}-content`}>
        <span>24 sessions</span>

        <span className={`${prefix}-content-title`}>
          Program Title Written here. Program Title Written here.
        </span>

        <span className={`${prefix}-content-status`}>Completed</span>

        <div className={`${prefix}-content-progress`}>
          <Progress percent={100} showInfo={false} />
        </div>

        <div className={`${prefix}-content-save`} onClick={onSave} />
      </div>
    </div>
  );
};
