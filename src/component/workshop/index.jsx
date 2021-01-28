import React, { useState, useEffect, useCallback } from 'react';
import './index.less';
import moment from 'moment';
import { Modal, message } from 'antd';
import { getPaperfromUrl } from '@/common/config';
import { RECEIVE_MESSAGE_TYPE } from '@/pages/index/home/constants';
import { programWorkshopEnd } from '@/pages/index/detail/constants';

const prefix = 'component-workshop';

function Workshop(props) {
  const { style = {}, data = {}, userId } = props;

  const [visible, setVisible] = useState(false);

  const [url, setUrl] = useState('');

  const onShow = () => {
    setVisible(true);
  };

  const onHide = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (data.WelcomePFKey) {
      setUrl(
        `${getPaperfromUrl(data.WelcomePFKey)}&time=${Math.round(
          new Date() / 1000,
        )}`,
      );
    }
  }, [data]);

  /**
   * 用户提交通过postmessage来获取参数 如果是workshop则执行
   * @param {*} event
   */
  const receiveMessage = useCallback((event) => {
    const { data: postMessageData } = event;

    if (!postMessageData) {
      return;
    }

    if (postMessageData.type !== RECEIVE_MESSAGE_TYPE.WORKSHOP) {
      return;
    }
    const { paperformData } = postMessageData;

    const payload = {
      userId,
      workshopId: data._id,
    };

    programWorkshopEnd(payload, { paperformData }).then((result) => {
      console.log('[workshop报名结束]', result);
      message.success('Workshop registered!');
      onHide();
    });
  }, []);

  /**
   * 监听window.postmessage事件
   */
  useEffect(() => {
    window.addEventListener('message', (event) => receiveMessage(event), false);
    return () => window.removeEventListener('message', () => {});
  }, []);

  return (
    <>
      <div className={`${prefix}`} style={{ ...style }} onClick={onShow}>
        <div className={`${prefix}-corner`} corner-type={data.FeeType}>
          {data.FeeType}
        </div>

        <img className={`${prefix}-cover`} src={data.Cover} />

        <section>
          {data.CreateAt && (
            <h2>
              {moment(data.CreateAt).format('dddd, MMM D YYYY | hh:mm A zz')}
            </h2>
          )}
          {data.Title && <h1>{data.Title}</h1>}
        </section>
      </div>

      <Modal
        visible={visible}
        footer={null}
        width={860}
        height={558}
        centered
        bodyStyle={{ height: '100%', padding: '0px' }}
        title="Workshop"
        onCancel={onHide}
      >
        <iframe width={812} height={452} src={url} />
      </Modal>
    </>
  );
}

export default Workshop;

export { Workshop };
