/**
 * program skills
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 16:29:48
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 16:34:52
 */
import React from 'react';
import { Card, Tag } from 'antd';
import './index.less';

const prefix = 'program-component';

export default (props) => {
  const { data } = props;
  return (
    <Card>
      <div className={`${prefix}-title`}>Skills</div>
      {data.Skills &&
        data.Skills.map((item, index) => {
          return (
            <Tag key={index} color="#e0e0e0">
              {item}
            </Tag>
          );
        })}
    </Card>
  );
};
