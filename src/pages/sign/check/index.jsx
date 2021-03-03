/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-01 10:08:47
 */
import React, { useState, useEffect, useRef } from 'react';
import '../index.less';
import { Form, Input, message } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { userActive, userActiveInfo } from '../constants';
import useSignSdk from '../store/sign-sdk';
// import { formatSearch } from '@/common/request';
import { useHistory } from 'react-router-dom';
import { ResponseCode } from '@/common/config';
import invariant from 'invariant';
import imgcheck from '@/assets/modal/Icon_Check_128x128.png';
import '@/component/paperform/index.less';
import Container from '../component/container';

const prefix = 'sign-page';

/**
 * @param {RenderCheckType} 渲染类型
 * @param Check 校验验证码
 * @param Result 显示结果
 * @param Paperform 通过校验的paperfrom
 */
const RenderCheckType = {
  Check: 'Check',
  Result: 'Result',
  Paperform: 'Paperform',
};

export default () => {
  const iframeContainerRef = useRef(null);
  const history = useHistory();
  const inputRef = useRef(null);
  const [form] = Form.useForm();
  // const params = formatSearch(history.location.search);

  const { userId, sign } = useSignSdk();

  /**
   * @param {validateStatus} 'success' 'warning' 'error' 'validating'
   *
   * 用户input框的状态
   */
  const [validateStatus, setValidateStatus] = useState('');

  /**
   * @param {errorMessage} 用户报错信息
   */
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * @param {renderType} 渲染的类型
   *
   */
  const [renderType, setRenderType] = useState(RenderCheckType.Check);

  /**
   * @param {userActiveResult} 用户active返回的数据
   */
  const [userActiveResult, setUserActiveResult] = useState({});
  // console.log('userActiveResult', userActiveResult);

  const [iframeHeight, setIframeHeight] = useState(-1);
  const [iframeWidth, setIframeWidth] = useState(-1);

  const setSize = () => {
    if (iframeContainerRef.current && iframeContainerRef.current.clientHeight) {
      setIframeHeight(iframeContainerRef.current.clientHeight - 64);
      setIframeWidth(iframeContainerRef.current.clientWidth);
    }
  };

  /**
   * 用户提交注册的paperfrom之后跳转到首页
   */
  const receiveMessage = (event) => {
    const payload = {
      userId: sign.userinfo?._id,
    };
    const { data: postMessageData } = event;
    const { paperformData } = postMessageData;
    userActiveInfo(payload, { paperformData })
      .then((result) => {
        console.log('[用户active paperform提交返回数据]', result);
        // message.success('')
        history.push('/home');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  /**
   * 监听window.postmessage事件
   */
  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => window.removeEventListener('message', receiveMessage);
  }, []);

  /**
   * 动态设置右侧高度
   * 为剩余屏幕高度
   */
  useEffect(() => {
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  /**
   * 用户激活之后的回调
   */
  const onUseractiveCallback = (result) => {
    try {
      /**
       * 如果用户成功激活
       * 显示result页面
       * 然后开始做paperform
       */
      invariant(
        result.error_code === ResponseCode.success,
        result.message || ' ',
      );
      setValidateStatus('success');
      setUserActiveResult(result.data);

      /**
       * 如果正确0.5秒后显示结果页
       */
      setTimeout(() => {
        setRenderType(RenderCheckType.Result);
      }, 0.5 * 1000);

      setTimeout(() => {
        setRenderType(RenderCheckType.Paperform);
      }, 3.5 * 1000);
    } catch (error) {
      /**
       * 如果失败显示失败信息
       */
      setValidateStatus('error');
      setErrorMessage(error.message);
    }
  };

  // const onSendCode = () => {
  //   userActive({ userId, code: event.target.value }).then((result) => {
  //     console.log('[userActive]', result);
  //     onUseractiveCallback(result);
  //   });
  // }

  const onInput = (event) => {
    if (event.target.value.length === 6) {
      inputRef.current?.blur();
      userActive({ userId, code: event.target.value }).then((result) => {
        onUseractiveCallback(result);
      });
    }
  };

  const getSuffix = () => {
    if (validateStatus === 'error') {
      return <CloseCircleFilled style={{ color: '#e86452' }} />;
    }
    if (validateStatus === 'success') {
      return <CheckCircleFilled style={{ color: '#2fc25b' }} />;
    }
    return <div />;
  };

  return (
    <div className="sign-component" ref={iframeContainerRef}>
      {renderType === RenderCheckType.Paperform ? (
        <iframe
          height={iframeHeight}
          width={iframeWidth}
          src={userActiveResult.url}
        />
      ) : (
        <Container style={{ width: '412px' }}>
          {renderType === RenderCheckType.Check && (
            <>
              <div className={`${prefix}-up-title`}>Check your email</div>
              <div className={`${prefix}-check-text`}>
                We’ve sent you a six-digit confirmation code to{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {` ${sign.userinfo?.Email || ''} `}.
                </span>{' '}
                Please enter it below to confirm your email address.
              </div>
              <Form
                form={form}
                layout="vertical"
                style={{ marginTop: 24 }}
                onChange={onInput}
              >
                <Form.Item
                  name="confirmationCode"
                  validateStatus={validateStatus}
                  help={
                    validateStatus === 'error' ? (
                      <div className={`${prefix}-check-error`}>
                        <CloseCircleFilled style={{ color: '#e86452' }} />
                        <span>{errorMessage}</span>
                      </div>
                    ) : null
                  }
                >
                  <Input
                    ref={inputRef}
                    placeholder="Enter 6 - digit code"
                    maxLength={6}
                    suffix={getSuffix()}
                  />
                </Form.Item>
              </Form>
              <div className={`${prefix}-check-text`}>
                <span
                  className={`${prefix}-check-url`}
                  style={{ color: '#1890ff' }}
                  common-touch="touch"
                >
                  Send code again
                </span>
                {` or find more information`}
                <p>
                  in our
                  <span
                    className={`${prefix}-check-url`}
                    style={{ color: '#1890ff', marginLeft: 5 }}
                    common-touch="touch"
                  >
                    Help Center.
                  </span>
                </p>
              </div>
            </>
          )}
          {renderType === RenderCheckType.Result && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                className="component-paperform-modal-icon"
                style={{ backgroundImage: `url(${imgcheck})` }}
              />
              <span
                className="component-paperform-modal-title"
                style={{ fontSize: 32 }}
              >
                Email verified
              </span>
              <span
                className="component-paperform-modal-subtitle"
                style={{ fontSize: 14 }}
              >
                Your email address was successfully verified!
              </span>
            </div>
          )}
          {renderType === RenderCheckType.Paperform && (
            <iframe
              height={iframeHeight}
              width={iframeWidth}
              src={userActiveResult.url}
            />
          )}
        </Container>
      )}
    </div>
  );
};
