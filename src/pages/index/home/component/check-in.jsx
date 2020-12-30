import React, { useEffect, useCallback, useState } from 'react';
import { Modal, Spin } from 'antd';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { checkEnd } from '../constants';
// import imgchar from '@/assets/Character/Component-Character-Female-A.svg';

const prefix = 'component-home';

function CheckInComponent(props) {
  const { url, visible, setVisible, title, onCompleteHideCallback } = props;

  const { sign } = useSignSdk();

  const [loading, setLoading] = useState(false);

  /**
   * 显示 check-in 结果 */
  // const [showCheckinResult, setShowCheckResult] = useState(false);

  /**
   * 是否完成了checkin */
  const [completedCheckin, setCompletedCheckin] = useState(false);

  const onHide = () => {
    setVisible(false);

    /**
     * 如果完成了checkin 则关闭的时候显示另一个modal */
    if (completedCheckin && onCompleteHideCallback) {
      onCompleteHideCallback();
    }
  };

  /**
   * 用户提交通过postmessage来获取参数 然后调用programEnd接口并执行回调跳转至下一个module
   * @param {*} event
   */
  const receiveMessage = useCallback((event) => {
    const { data: postMessageData } = event;
    console.log('postMessageData', postMessageData);
    // const { progressData, paperformData } = postMessageData;

    const payload = {
      userId: sign.userinfo?._id,
    };

    checkEnd(payload).then((result) => {
      console.log('checkEnd', result);
      // setShowCheckResult(true);
      setCompletedCheckin(true);
    });
  }, []);

  /**
   * 监听window.postmessage事件
   */
  useEffect(() => {
    window.addEventListener('message', (event) => receiveMessage(event), false);
    return () => window.removeEventListener('message', () => {});
  }, []);

  useEffect(() => {
    if (url && url.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [url]);

  return (
    <Modal
      visible={visible}
      footer={null}
      width={860}
      height={558}
      centered
      bodyStyle={{ height: '100%', padding: '0px' }}
      title={title}
      onCancel={onHide}
    >
      <Spin className={`${prefix}-skeleton`} spinning={loading} size="large">
        {/* {!showCheckinResult ? (
          <iframe width={812} height={452} src={url} />
        ) : (
          <div className={`${prefix}-checkin`}>
            <h1>Great work!</h1>
            <p>Great work for taking a few minutes to reflect! </p>
            <p>
              Perfectionism may be your natural tendency and people around you
              may know you care deeply about the quality of your work.
            </p>
            <ul>
              Have you thought of the following?
              <li>Get some water</li>
              <li>Take a power nap </li>
              <li>Get a good night of sleep </li>
              <li>
                Strategize and prioritize first before you start working. Not
                everything needs to be perfect.
              </li>
            </ul>
            <p>
              Check out the Insights page to explore your results and patterns.
            </p>
            <img src={imgchar} className={`${prefix}-checkin-corner`} />
          </div>
        )} */}
        <iframe width={812} height={452} src={url} />
      </Spin>
    </Modal>
  );
}

export default CheckInComponent;

export { CheckInComponent };
