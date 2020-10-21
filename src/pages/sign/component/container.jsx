/**
 * sign模块通用组件
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:19:11
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-20 22:21:26
 */
import React from 'react';
import './index.less';

const prefix = 'sign-component';
export default (props) => {
  return (
    <div className={`${prefix}`}>
      <div className={`${prefix}-box`}>{props.children}</div>
    </div>
  );
};
