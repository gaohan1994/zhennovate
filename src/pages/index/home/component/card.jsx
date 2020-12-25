import React from 'react';
import './index.less';
import { ArrowRightOutlined, EllipsisOutlined } from '@ant-design/icons';
import imggoal from '@/assets/Icon-Action@2x.png';
import { Menu, Dropdown } from 'antd';

const prefix = 'component-home-actions';

function HomeProgramCard(props) {
  const { data } = props;
  const isEmpty = data && data._id;

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

  const dropMenu = (
    <Menu>
      <Menu.Item key="calendar" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
        Add to Calendar
      </Menu.Item>
      <Menu.Item key="program" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
        View Program
      </Menu.Item>
      <Menu.Item key="delete" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
        Delete Action
      </Menu.Item>
    </Menu>
  );

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
        <span style={{ fontSize: 14 }}>
          <span style={{ fontWeight: 'bolder' }}>
            {`${Module.Duration || 0} +`}
          </span>{' '}
          working on this action
        </span>
      </div>

      <span className={`${prefix}-complete`} style={{ color: 'gray' }}>
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
