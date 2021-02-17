import React from 'react';
import './index.less';
import { ArrowRightOutlined, EllipsisOutlined } from '@ant-design/icons';
import imggoal from '@/assets/Icon-Action@2x.png';
import { Menu, Dropdown, message } from 'antd';
import { useHistory } from 'react-router-dom';
import useCalendar from '@/component/calendar/store';
import { CalendarType } from '@/component/calendar';
import { entryDelete } from '../constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import invariant from 'invariant';
import { ResponseCode } from '@/common/config';
import { RenderPaperformKeyTypes } from '@/component/paperform';

const prefix = 'component-home-actions';

function HomeProgramCard(props) {
  const history = useHistory();
  const { data, callback } = props;
  const isEmpty = data && data._id;
  const { isSign, userId } = useSignSdk();

  if (!isEmpty) {
    return (
      <div className={`${prefix}-card ${prefix}-empty`}>
        <div
          className={`${prefix}-icon`}
          style={{ backgroundImage: `url(${imggoal})`, marginRight: 16 }}
        />
        <span
          style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12 }}
          className={`${prefix}-title`}
        >
          No actions in progress
        </span>
        <span style={{ marginTop: 12 }}>
          Start another action in any program
        </span>
      </div>
    );
  }

  const { Module } = data;

  const { showCalendar } = useCalendar();

  // const onViewProgram = () => {
  //   history.push(`/program/describe/${data.Program}`);
  // };

  const onQuitAction = () => {
    try {
      invariant(isSign, 'Please Sign in');
      const payload = {
        userId,
        entryId: data._id,
      };
      entryDelete(payload).then((result) => {
        if (result.error_code === ResponseCode.success) {
          message.success('Quit Action !');
          callback && callback();
        }
      });
    } catch (error) {
      message.error(error.message);
    }
  };

  const onAddCalendar = () => {
    showCalendar({
      ...data.Module,
      calendarType: CalendarType.reflect,
      program: data?.Program,
    });
  };

  const dropMenu = (
    <Menu>
      <Menu.Item
        key="calendar"
        style={{ color: 'rgba(0, 0, 0, 0.65)' }}
        onClick={onAddCalendar}
      >
        Add to Calendar
      </Menu.Item>
      <Menu.Item
        key="delete"
        style={{ color: 'rgba(0, 0, 0, 0.65)' }}
        onClick={onQuitAction}
      >
        Quit Action
      </Menu.Item>
    </Menu>
  );

  const onCompleteAction = () => {
    history.push(
      `/program/detail/${data.Program}?module_id=${data.Module?._id}&paperformKey=${RenderPaperformKeyTypes.CompletePFKey}`,
    );
  };

  // <span style={{ fontSize: 14 }}>
  //   <span style={{ fontWeight: 'bolder' }}>{`${Module.Duration || 0} +`}</span>{' '}
  //   working on this action
  // </span>;
  return (
    <div
      className={`${prefix}-card`}
      style={{ display: 'flex', flexDirection: 'row', paddingTop: 50 }}
    >
      <div
        className={`${prefix}-icon`}
        style={{ backgroundImage: `url(${imggoal})`, marginRight: 16 }}
      />

      <div className={`${prefix}-detail`} style={{ width: 240 }}>
        <span style={{ fontSize: 14, color: '#2fc25b' }}>In Progress</span>
        <span
          style={{ fontWeight: 'bolder', fontSize: 16 }}
          className={`${prefix}-title`}
        >
          {Module.Title || ''}
        </span>
      </div>

      <span
        className={`${prefix}-complete`}
        // style={{ color: 'gray' }}
        onClick={onCompleteAction}
      >
        Complete Action
        <ArrowRightOutlined style={{ fontSize: 12, marginLeft: 8 }} />
      </span>

      <Dropdown trigger={['click']} overlay={dropMenu}>
        <div className={`${prefix}-edit`} style={{ color: '#080808' }}>
          <EllipsisOutlined style={{ fontSize: 20 }} />
        </div>
      </Dropdown>
    </div>
  );
}

export default HomeProgramCard;

export { HomeProgramCard };
