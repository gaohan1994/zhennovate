/**
 * program 老师详情
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 16:29:48
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 16:57:53
 */
import React from 'react';
import { Card } from 'antd';
import './index.less';

const prefix = 'program-component';

export default (props) => {
  const { data } = props;
  return (
    <Card>
      <div className={`${prefix}-title`}>About the Instructor</div>
      {data.Teachers &&
        data.Teachers.map((item, index) => {
          return (
            <div key={index} className={`${prefix}-instructor-item`}>
              <div
                className={`${prefix}-instructor-item-cover`}
                style={{ backgroundImage: `url(${item.Avatar})` }}
              />
              <div className={`${prefix}-instructor-item-detail`}>
                <div
                  className={`${prefix}-instructor-item-name`}
                  style={{ marginBottom: 12 }}
                >
                  Name
                </div>
                <div className={`${prefix}-instructor-item-text`}>
                  {item.Name}
                </div>

                <div
                  className={`${prefix}-instructor-item-about`}
                  style={{ marginTop: 32, marginBottom: 12 }}
                >
                  Instructor Bio
                </div>
                <div className={`${prefix}-instructor-item-text`}>
                  {item.Desc}
                </div>
              </div>
            </div>
          );
        })}
    </Card>
  );
};
