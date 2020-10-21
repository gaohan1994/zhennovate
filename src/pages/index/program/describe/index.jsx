/**
 * program describe 页面
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 14:11:51
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 16:59:13
 */
import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { program } from '../constants';
import '../index.less';
import Bread from '../component/bread';
import Card from '../component/card';
import Outcome from '../component/outcome';
import Detail from '../component/detail';
import Skill from '../component/skill';
import Instructor from '../component/instructor';
import Coach from '../component/coach';

const prefix = 'page-program';

export default (props) => {
  const { id } = props.match.params;
  // program详情数据
  const [programDescribe, setProgramDescribe] = useState({});

  // 获取program详情
  useEffect(() => {
    if (id) {
      program(id)
        .then((result) => {
          setProgramDescribe(result.data);
        })
        .catch((error) => {
          notification.error({ message: error.message });
        });
    }
  }, [id]);

  return (
    <div className={`${prefix}-container`}>
      <div className={`${prefix}-container-box`}>
        <div className={`${prefix}-container-left`}>
          <Bread data={programDescribe} entry="entry" />
          <div className={`${prefix}-describe-title`}>
            {programDescribe.Name}
          </div>

          <div style={{ width: '100%', height: 32 }} />
          <Detail data={programDescribe} />

          <div style={{ width: '100%', height: 32 }} />
          <Skill data={programDescribe} />

          <div style={{ width: '100%', height: 32 }} />
          <Instructor data={programDescribe} />

          <div style={{ width: '100%', height: 32 }} />
          <Coach data={programDescribe} />
        </div>

        <div
          className={`${prefix}-container-right`}
          style={{ paddingTop: 32 + 32 }}
        >
          <Card data={programDescribe} />

          <div style={{ width: '100%', height: 32 }} />

          <Outcome data={programDescribe} />
        </div>
      </div>
    </div>
  );
};
