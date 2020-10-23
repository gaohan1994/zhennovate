/**
 * program card
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 14:32:16
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 16:19:56
 */
import React from 'react';
import { Card } from 'antd';
import './index.less';

const prefix = 'program-component';

export default (props) => {
  const { data } = props;
  return (
    <Card>
      <div className={`${prefix}-title`}>Learner Outcome</div>
      {data.OutComes &&
        data.OutComes.map((item, index) => {
          return (
            <div key={index} className={`${prefix}-outcome-item`}>
              <div className={`${prefix}-outcome-item-rate`}>{item.rate}</div>
              <div>{item.content}</div>
            </div>
          );
        })}
    </Card>
  );
};