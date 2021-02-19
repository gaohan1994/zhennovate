/**
 * program item 组件
 * @Author: centerm.gaohan
 * @Date: 2020-10-22 14:13:33
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-04 15:34:53
 */
import React, { useState, useEffect } from 'react';
import { Progress, message } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.less';
import imgbooksaved from '@/assets/Icon-Bookmark-Solid.png';
import imgbookunsave from '@/assets/Icon-Bookmark-outline@2x.png';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { saveProgram, unsaveprogram } from '../constants';
import { ResponseCode } from '@/common/config';
import { ProgramTabKeys } from '@/pages/index/program/constants';
import moment from 'moment';

const prefix = 'component-program';

function Program(props) {
  const { data: programData, tab, type, style = {}, fieldSaved } = props;
  const history = useHistory();
  const { userId, sign } = useSignSdk();
  const [data, setData] = useState({});

  useEffect(() => {
    if (programData) {
      setData(programData);
    }
  }, [programData]);

  const onClick = () => {
    /**
     * @param {navigateToPaperfromToken} 正在进行或已完成的program应该跳过program简介页面
     */
    const navigateToPaperfromToken = data.IsOpened;

    if (navigateToPaperfromToken) {
      const firstModule =
        (data?.Sessions &&
          data?.Sessions[0] &&
          data?.Sessions[0].Modules &&
          data?.Sessions[0].Modules[0]) ||
        '';
      history.push(`/program/detail/${data._id}?module_id=${firstModule}`);
      return;
    }

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

    if (data.IsSaved === true) {
      unsaveprogram({ userId, programId: data._id }).then((result) => {
        if (result.error_code === ResponseCode.success) {
          message.success('Program unsaved.');
          setData((prevData) => {
            return {
              ...prevData,
              IsSaved: prevData.IsSaved === true ? false : true,
            };
          });

          /**
           * @todo 如果在saved中取消保存则在页面中删除这个
           */
          if (tab.key === ProgramTabKeys.save) {
            fieldSaved.run(sign.userinfo);
          }
        }
      });
      return;
    }

    saveProgram({ userId, programId: data._id }).then((result) => {
      if (result.error_code === ResponseCode.success) {
        message.success('Program saved.');
        setData((prevData) => {
          return {
            ...prevData,
            IsSaved: prevData.IsSaved === true ? false : true,
          };
        });

        /**
         * @todo 如果在saved中取消保存则在页面中删除这个
         */
        if (tab.key === ProgramTabKeys.save) {
          fieldSaved.run(sign.userinfo);
        }
      }
    });
  };

  if (type === 'card') {
    let teachersName = 'Unknow Coach Name';

    if (data.Teachers && data.Teachers.length > 0) {
      teachersName = 'By';

      const names = data.Teachers.map((t) => t.Name);
      teachersName += ` ${names.join(', ')}`;
    }

    const duration = data.totalDuration;

    const hours = moment.duration(duration, 'minutes').hours();
    const hoursString = hours !== 0 ? `${hours} h` : '';

    const minutes = moment.duration(duration, 'minutes').minutes();
    const minutesString = `${minutes} m`;

    return (
      <div className={`${prefix}-card`} style={{ ...style }} onClick={onClick}>
        <div
          className={`${prefix}-card-cover`}
          style={{ backgroundImage: `url(${data.Cover})` }}
          common-touch="touch"
        />
        <div className={`${prefix}-card-detail`}>
          <span className={`${prefix}-card-title`}>{data.Name}</span>
          <span style={{ marginTop: 12 }}>{teachersName}</span>
          <span style={{ marginTop: 12 }}>
            {data.Sessions?.length || 0} sessions{' '}
            {`${hoursString} ${minutesString}`}
          </span>

          <div
            className={`${prefix}-content-save`}
            style={{
              backgroundImage: `url(${
                data.IsSaved ? imgbooksaved : imgbookunsave
              })`,
            }}
            common-touch="touch"
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
        : `${data.Sessions.length - data.FinishSessionTotal} ${
            data.Sessions.length - data.FinishSessionTotal > 1
              ? 'sessions'
              : 'session'
          } left`
      : '';

  const widthStyle = type !== 'home' ? { width: 312 } : { width: 520 };

  return (
    <div
      className={`${prefix} ${prefix}-fix`}
      onClick={onClick}
      style={{ ...style }}
    >
      <div
        className={`${prefix}-cover`}
        style={{ backgroundImage: `url(${data.Cover})` }}
        common-touch="touch"
      />
      <div className={`${prefix}-content`}>
        <span>
          {data.Sessions?.length || 0}{' '}
          {data.Sessions?.length > 1 ? 'sessions' : 'session'}
        </span>

        <span className={`${prefix}-content-title`} style={{ minHeight: 56 }}>
          {data.Name}
        </span>

        <span className={`${prefix}-content-status`} style={widthStyle}>
          <span>{percentText}</span>
          {percent !== 1 && <span>{`${Math.ceil(percent * 100)}%`}</span>}
          {/* <span>{`${Math.ceil(percent * 100)}%`}</span> */}
        </span>

        <div style={widthStyle} className={`${prefix}-content-progress`}>
          <Progress percent={percent * 100} showInfo={false} />
        </div>

        {type !== 'home' && (
          <div
            common-touch="touch"
            className={`${prefix}-content-save`}
            style={{
              backgroundImage: `url(${
                data.IsSaved ? imgbooksaved : imgbookunsave
              })`,
            }}
            onClick={onSave}
          />
        )}
      </div>
    </div>
  );
}
export default Program;

export { Program };
