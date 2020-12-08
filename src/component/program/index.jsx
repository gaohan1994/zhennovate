/**
 * program item 组件
 * @Author: centerm.gaohan
 * @Date: 2020-10-22 14:13:33
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-08 10:52:31
 */
import React from 'react';
import { Progress } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.less';
// import imgbooksaved from '@/assets/Icon-Bookmark-Solid.png';
import imgbookunsave from '@/assets/Icon-Bookmark-outline@2x.png';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { saveProgram } from '../constants';

const prefix = 'component-program';

function Program(props) {
  const { data, tab, type, style = {} } = props;
  const history = useHistory();

  const { userId } = useSignSdk();

  const onClick = () => {
    history.push(
      `/program/describe/${data._id}${tab ? `?entry=${tab.key}` : ''}`,
    );
  };

  // 点击保存、取消保存 阻止冒泡
  const onSave = (e) => {
    e.stopPropagation();

    // 说明未登录
    if (!userId) {
      history.push('/sign/signin');
      return;
    }

    saveProgram({ userId, programId: data._id }).then((result) => {
      console.log('result', result);
    });
  };

  if (type === 'card') {
    let teachersName = 'Unknow Coach Name';

    if (data.Teachers && data.Teachers.length > 0) {
      teachersName = 'By';

      const names = data.Teachers.map((t) => t.Name);
      teachersName += ` ${names.join(', ')}`;
    }

    return (
      <div className={`${prefix}-card`} style={{ ...style }} onClick={onClick}>
        <div
          className={`${prefix}-card-cover`}
          style={{ backgroundImage: `url(${data.Cover})` }}
        />
        <div className={`${prefix}-card-detail`}>
          <span className={`${prefix}-card-title`}>{data.Name}</span>
          <span style={{ marginTop: 12 }}>{teachersName}</span>
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

  const percent =
    data && data._id ? data.FinishSessionTotal / data.Sessions.length : 0;

  const percentText =
    data && data._id
      ? percent === 1
        ? 'Completed'
        : `${data.Sessions.length - data.FinishSessionTotal} sessions left`
      : '';

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

        <span className={`${prefix}-content-title`} style={{ minHeight: 56 }}>
          {data.Name}
        </span>

        <span className={`${prefix}-content-status`}>
          <span>{percentText}</span>
          {percent !== 1 && <span>{`${Math.ceil(percent * 100)}%`}</span>}
        </span>

        <div className={`${prefix}-content-progress`}>
          <Progress percent={percent * 100} showInfo={false} />
        </div>

        <div
          className={`${prefix}-content-save`}
          style={{ backgroundImage: `url(${imgbookunsave})` }}
          onClick={onSave}
        />
      </div>
    </div>
  );
}
export default Program;

export { Program };
