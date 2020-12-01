/**
 * 首页的welcome
 *
 * @Author: centerm.gaohan
 * @Date: 2020-11-30 09:58:42
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-11-30 16:38:35
 */
import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './index.less';

const prefix = 'component-home-actions';

function Actions() {
  return (
    <div className={`${prefix}`}>
      <div className={`${prefix}-header`} style={{ flexDirection: 'row' }}>
        <div className={`${prefix}-header-left`}>
          <span className={`${prefix}-header-title`}>My Actions</span>
          <span style={{ marginTop: 5 }}>
            Practice what you’ve learned for mastery
          </span>
        </div>

        <div className={`${prefix}-bar`}>
          <div style={{ marginRight: 13 }}>1 / 1</div>
          <div>
            <LeftOutlined />
            <RightOutlined />
          </div>
        </div>
      </div>

      <div className={`${prefix}-bar`}>
        <div className={`${prefix}-card`} style={{ marginRight: 24 }}>
          card
        </div>
        <div className={`${prefix}-card`}>card</div>
      </div>
    </div>
  );
}

export default Actions;
