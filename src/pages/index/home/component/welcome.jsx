/**
 * 首页的welcome
 *
 * @Author: centerm.gaohan
 * @Date: 2020-11-30 09:58:42
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-30 16:57:32
 */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ArrowRightOutlined } from '@ant-design/icons';
import './index.less';
import imgavatar from '@/assets/Character/Component-Character-Female-A.svg';
import imgemoji from '@/assets/Icon-Emoji-Hi@2x.png';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import CheckInComponent from './check-in';
import { checkin, checkStart } from '../constants';
import { ResponseCode } from '@/common/config';
import PaperformActionModal from '@/component/paperform/component/modal';
import imgcalendar from '@/assets/modal/Icon_Calendar_128x128.png';

const prefix = 'component-home-welcome';

function Welcome(props) {
  // const {} = props;
  const { sign, checkSign } = useSignSdk();
  const { userinfo } = sign;

  const [isCheckin, setIsCheckin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checkinData, setCheckinData] = useState({});

  // check in 之后的modal
  const [afterCheckinModal, setAfterCheckinModal] = useState(false);

  const showAfterCheckinModal = () => {
    setAfterCheckinModal(true);
  };
  const hideAfterCheckinModal = () => {
    setAfterCheckinModal(false);
  };

  // 判断是否check in
  const fetchCheckin = () => {
    checkin({ userId: sign.userinfo._id }).then((result) => {
      if (result.error_code === ResponseCode.success) {
        setIsCheckin(result.date.ischecked);
      }
    });
  };

  useEffect(() => {
    if (sign.userinfo && sign.userinfo._id) {
      fetchCheckin();
    }
  }, []);

  const onCheckIn = () => {
    checkSign(() => {
      setVisible(true);
      checkStart({ userId: sign.userinfo._id }).then((result) => {
        if (result.error_code === ResponseCode.success) {
          setCheckinData(result.data);
        }
      });
    });
  };

  /**
   * check-in 之后的 callback
   * 将是否check-in设置为true
   * 显示completed check-in modal
   *  */
  const onCompleteHideCallback = () => {
    console.log('[check-in callback start]');
    setIsCheckin(true);
    showAfterCheckinModal();
  };

  return (
    <>
      {isCheckin ? (
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
      ) : (
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

          <div
            className={`${prefix}-check`}
            onClick={onCheckIn}
            // style={{ color: 'gray' }}
          >
            Check In
            <ArrowRightOutlined style={{ fontSize: 12, marginLeft: 8 }} />
          </div>

          <div
            className={`${prefix}-avatar`}
            style={{ backgroundImage: `url(${imgavatar})` }}
          />
        </div>
      )}

      <CheckInComponent
        title="Daily check-in"
        visible={visible}
        setVisible={setVisible}
        url={checkinData.url}
        onCompleteHideCallback={onCompleteHideCallback}
      />
      <PaperformActionModal
        icon={imgcalendar}
        title="Daily check-in completed!"
        subTitle="Continue completing your daily check-in to ensure your insights page shows the most accurate data!"
        visible={afterCheckinModal}
        setVisible={setAfterCheckinModal}
        confirmButton="Confirm"
        confirmCallback={hideAfterCheckinModal}
      />
    </>
  );
}

export default Welcome;
