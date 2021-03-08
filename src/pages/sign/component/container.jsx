/**
 * sign模块通用组件
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:19:11
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-08 10:37:44
 */
import React from 'react';
import './index.less';
import { Card } from 'antd';

const prefix = 'sign-component';
export default (props) => {
  const { style = {}, border = true, extra } = props;
  return (
    <div className={`${prefix}`}>
      <div className={`${prefix}-box`} style={{ ...style }}>
        <Card bordered={border}>{props.children}</Card>
      </div>
      {extra}
    </div>
  );
};
