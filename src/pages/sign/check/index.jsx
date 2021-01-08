/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-08 10:05:05
 */
import React, { useState, useEffect, useRef } from 'react';
import Container from '../component/container';
import '../index.less';
import { Form, Input } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { userActive } from '../constants';
import useSignSdk from '../store/sign-sdk';
// import { formatSearch } from '@/common/request';
import { useHistory } from 'react-router-dom';
import { ResponseCode } from '@/common/config';
import invariant from 'invariant';
import imgcheck from '@/assets/modal/Icon_Check_128x128.png';

import '@/component/paperform/index.less';
import RenderPaperForm from '@/component/paperform';

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
  const history = useHistory();
  const inputRef = useRef(null);
  const [form] = Form.useForm();
  // const params = formatSearch(history.location.search);

  const { userId, sign } = useSignSdk();

  useEffect(() => {
    if (!userId) {
      history.replace('/sign/signup');
    }
  }, [userId]);

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
  const [renderType, setRenderType] = useState(RenderCheckType.Result);

  const [userActiveResult, setUserActiveResult] = useState({});
  console.log('userActiveResult', userActiveResult);

  const onUseractiveCallback = (result) => {
    try {
      console.log(
        'result.error_code === ResponseCode.success',
        result.error_code === ResponseCode.success,
      );
      invariant(
        result.error_code === ResponseCode.success,
        result.message || ' ',
      );
      setValidateStatus('success');
      setUserActiveResult(result);

      /**
       * 如果正确1秒后显示结果页
       */
      setTimeout(() => {
        setRenderType(RenderCheckType.Result);
      }, 0.5 * 1000);
      // setShowSuffix(true);
    } catch (error) {
      setValidateStatus('error');
      // message.error(error.message);
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
        console.log('[userActive]', result);
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
    <Container>
      {renderType === RenderCheckType.Check && (
        <>
          <div className={`${prefix}-up-title`}>Check your email</div>
          <div className={`${prefix}-check-text`}>
            We’ve sent you a six-digit confirmation code to{' '}
            <span style={{ fontWeight: 'bold' }}>
              [{` ${sign.userinfo?.Email || ''} `}].
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
            >
              Send code again
            </span>
            {` or find more information in`}
            <span
              className={`${prefix}-check-url`}
              style={{ color: '#1890ff', marginLeft: 5 }}
            >
              Help Center.
            </span>
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
        <div>
          <RenderPaperForm />
        </div>
      )}
    </Container>
  );
};
