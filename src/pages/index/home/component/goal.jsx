import React, { useState, useEffect, useCallback } from 'react';
import { Tag, Modal, message, Spin } from 'antd';
import './index.less';
import imgbg from '@/assets/home/Group-38510.png';
import {
  goal,
  goalEnd,
  RECEIVE_MESSAGE_TYPE,
  goalStart,
  quotes,
} from '../constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { ResponseCode } from '@/common/config';
import invariant from 'invariant';
import { useHistory } from 'react-router-dom';
import { chunk } from 'lodash';

const prefix = 'component-home';

function Goal({ style = {} }) {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const { isSign, userId } = useSignSdk();

  // goal的paperfrom的地址
  const [url, setUrl] = useState('');

  // 用户的目标
  const [userGoal, setUserGoal] = useState([]);

  // Learning Goal 加载中
  const [loading, setLoading] = useState(false);

  // 名人名言
  const [userQuotes, setUserQuotes] = useState([]);

  const [cardHeight, setCardHeight] = useState(838);

  /**
   * 当屏幕高度小于ui上的card高度时候则赋值为屏幕高度，并适配
   */
  useEffect(() => {
    const height = document.body.clientHeight;
    const cardPositionMargin = 64 + 32 + 32;
    if (height - cardPositionMargin < 838) {
      setCardHeight(height - cardPositionMargin);
    }
  }, []);

  useEffect(() => {
    if (isSign) {
      setLoading(true);
      fetchLearningGoalUrl();
      setUserLearningGoal();
      fetchQuotes();
    }
  }, [userId, isSign]);

  /**
   * 监听window.postmessage事件
   */
  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => receiveMessage(event, RECEIVE_MESSAGE_TYPE.CHANGE_GOAL),
      false,
    );
    return () => window.removeEventListener('message', () => {});
  }, []);

  // 请求 quotes
  const fetchQuotes = () => {
    quotes().then((result) => {
      console.log('[名人名言：]', result);
      if (result && result.error_code === ResponseCode.success) {
        setUserQuotes(result.data);
      }
    });
  };

  // 请求用户Learning Goal的paperfrom地址
  const fetchLearningGoalUrl = () => {
    setLoading(true);
    goalStart({ userId })
      .then((result) => {
        console.log('[请求goal的paperfrom地址]', result);
        if (result.error_code === ResponseCode.success) {
          setUrl(`${result.data?.url}&num=${Math.random()}`);
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.message);
      });
  };

  // 请求用户Learning goal数据
  const setUserLearningGoal = () => {
    goal({ userId })
      .then((result) => {
        console.log('[用户的goal]', result);
        setUserGoal(result.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.message);
      });
  };

  /**
   * 用户提交通过postmessage来获取参数 修改goal
   * @param {*} event
   */
  const receiveMessage = useCallback((event) => {
    const { data: postMessageData } = event;
    if (
      postMessageData &&
      postMessageData.type === RECEIVE_MESSAGE_TYPE.CHANGE_GOAL
    ) {
      const { paperformData } = postMessageData;
      console.log('[window message goal数据]', postMessageData);
      if (paperformData) {
        const payload = {
          userId: userId,
        };

        goalEnd(payload, { paperformData }).then((result) => {
          message.success('Learning Goal Changed!');
          setLoading(true);
          setVisible(false);
          setTimeout(() => {
            setUserLearningGoal();
          }, 1500);
        });
      }
    }
  }, []);

  const onShow = () => {
    try {
      invariant(isSign, 'Please Sign in');
      goalStart({ userId }).then((result) => {
        console.log('[请求goal的paperfrom地址]', result);
        if (result.error_code === ResponseCode.success) {
          setUrl(`${result.data?.url}&time=${Math.round(new Date() / 1000)}`);
        }
      });
      setVisible(true);
    } catch (error) {
      message.error(error.message);
      history.push(`/sign/signin`);
    }
  };

  const onHide = () => {
    setVisible(false);
  };

  /**
   * @param showLearningTabs 是否显示 LearningGoal
   * @param learningTabs Learning Goal Tabs的数据
   */
  const showLearningTabs = userGoal && userGoal[0] && userGoal[0].value;
  const learningTabs = showLearningTabs ? chunk(userGoal[0].value, 2) : [];

  /**
   * @param showLearningGoalTitle 是否显示 LearningGoal
   * @param learningTitle Learning Goal Tabs的数据
   */
  const showLearningGoalTitle = userGoal && userGoal[1] && userGoal[1].value;
  const learningTitle = showLearningGoalTitle ? userGoal[1].value : '';

  const showQuotes = userQuotes && userQuotes.length > 0;
  // const quotesText = showQuotes ? userQuotes.join(' ') : '';

  return (
    <div
      className={`${prefix}-goal-box`}
      style={{ ...style, height: cardHeight, backgroundImage: `url(${imgbg})` }}
    >
      <Spin spinning={loading}>
        <div className={`${prefix}-goal`}>
          <h2 style={{ marginTop: 123 }}>My Learning Goals</h2>
          <div
            style={{
              marginTop: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {showLearningTabs ? (
              <>
                {learningTabs.map((tabs, index) => {
                  return (
                    <p key={index} style={{ marginTop: 8 }}>
                      {tabs.map((tab) => {
                        return (
                          <Tag color="#e0e0e0" key={tab}>
                            <span style={{ color: '#1b2631' }}>{tab}</span>
                          </Tag>
                        );
                      })}
                    </p>
                  );
                })}
              </>
            ) : (
              <p>
                <Tag color="#e0e0e0">
                  <span style={{ color: '#1b2631' }}>Confidence</span>
                </Tag>
              </p>
            )}
          </div>
          <span style={{ marginTop: 18, fontSize: 16, textAlign: 'center' }}>
            {learningTitle}
          </span>
          <span
            style={{
              marginTop: 8,
              marginBottom: 36,
              textAlign: 'center',
              color: '#1890ff',
            }}
            onClick={onShow}
            common-touch="touch"
          >
            edit
          </span>

          {showQuotes ? (
            <>
              {userQuotes.map((quote) => {
                return (
                  <span
                    key={quote}
                    style={{
                      marginTop: 12,
                      fontSize: 14,
                      textAlign: 'center',
                    }}
                  >
                    {quote}
                  </span>
                );
              })}
            </>
          ) : (
            <>
              <span
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  textAlign: 'center',
                }}
              >
                “The golden opportunity you are seeking is in yourself. It is
                not in your environment; it is not in luck or chance, or the
                help of others; it is in yourself alone.”
              </span>
              <span style={{ marginTop: 8, fontSize: 14 }}>
                — Orison Sweet Marden
              </span>
            </>
          )}
        </div>
      </Spin>

      <Modal
        visible={visible}
        footer={null}
        width={812}
        height={558}
        centered
        bodyStyle={{ height: '100%', padding: '0px' }}
        title="My Learning Goal"
        onCancel={onHide}
      >
        <iframe width={812} height={452} src={url} />
      </Modal>
    </div>
  );
}

export default Goal;

export { Goal };
