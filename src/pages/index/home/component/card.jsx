import React from 'react';
import './index.less';
import { ArrowRightOutlined, EllipsisOutlined } from '@ant-design/icons';
import imggoal from '@/assets/Icon-Action@2x.png';

const prefix = 'component-home-actions';

function HomeProgramCard() {
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
        <span style={{ fontSize: 14, color: '#2fc25b', fontStyle: 'italic' }}>
          In Progress
        </span>
        <span
          style={{ fontWeight: 'bold', fontSize: 16 }}
          className={`${prefix}-title`}
        >
          Action prompt is written here. Action prompt is written here. Action
          prompt is written here. Actionprompt is written here. Actionprompt is
          written here. Action
        </span>
        <span style={{ fontSize: 14 }}>
          <span style={{ fontWeight: 'bold' }}>20 +</span> working on this
          action
        </span>
      </div>

      <span className={`${prefix}-complete`} style={{color: 'gray'}}>
        Complete Action
        <ArrowRightOutlined style={{ fontSize: 12, marginLeft: 8 }} />
      </span>

      <div className={`${prefix}-edit`} style={{ color: '#080808' }}>
        <EllipsisOutlined style={{ fontSize: 20 }} />
      </div>
    </div>
  );
}

export default HomeProgramCard;

export { HomeProgramCard };
