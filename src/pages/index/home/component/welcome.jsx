/**
 * 首页的welcome
 *
 * @Author: centerm.gaohan
 * @Date: 2020-11-30 09:58:42
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-25 09:33:22
 */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ArrowRightOutlined } from '@ant-design/icons';
import './index.less';
import imgavatar from '@/assets/Character/Component-Character-Female-A.svg';
import imgemoji from '@/assets/Icon-Emoji-Hi@2x.png';
import useSignSdk from '@/pages/sign/store/sign-sdk';

const prefix = 'component-home-welcome';

function Welcome(props) {
  // const {} = props;
  const { sign } = useSignSdk();
  const { userinfo } = sign;

  const [isCheckin, setIsCheckin] = useState(false);

  useEffect(() => {
    // 判断是否check in
    setIsCheckin(false);
  }, [sign.userinfo]);

  if (isCheckin) {
    return (
      <div className={`${prefix}-sign`}>
        <span>
          {`Happy ${moment().format('dddd')}, ${
            (sign && sign.userinfo && sign.userinfo.Name) || ''
          }!`}
        </span>
        <span
          className={`${prefix}-info-emoji`}
          style={{ backgroundImage: `url(${imgemoji})` }}
        />
      </div>
    );
  }
  return (
    <div className={`${prefix}-box`} style={{ marginTop: 180 - 128 }}>
      <div className={`${prefix}-info`}>
        <span className={`${prefix}-info-title`}>
          Welcome back
          {`${userinfo && userinfo.Name ? `, ${userinfo.Name}` : ''}`}!
          <span
            className={`${prefix}-info-emoji`}
            style={{ backgroundImage: `url(${imgemoji})` }}
          />
        </span>
        <span>Ready for your daily check in?</span>
      </div>

      <div className={`${prefix}-check`} style={{ color: 'gray' }}>
        Check In
        <ArrowRightOutlined style={{ fontSize: 12, marginLeft: 8 }} />
      </div>

      <div
        className={`${prefix}-avatar`}
        style={{ backgroundImage: `url(${imgavatar})` }}
      />
    </div>
  );
}

export default Welcome;
