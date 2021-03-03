/**
 * 忘记密码页面
 * @Author: centerm.gaohan
 * @Date: 2020-12-18 11:37:00
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-03 16:22:29
 */
import React, { useState } from 'react';
import Container from '../component/container';
import '../index.less';
import FormItem from '../component/form-item';
import { Form, message, Button, Input } from 'antd';
import md5 from 'blueimp-md5';
import SignButton from '../component/button';
import { resetPassword } from '../constants';
import { ResponseCode } from '@/common/config';
import { useHistory } from 'react-router-dom';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const prefix = 'sign-page';

function ResetPage(props) {
  const { forgotId } = props.match.params;
  const [form] = Form.useForm();
  const history = useHistory();

  const [showResult, setShowResult] = useState(false);
  const [errorFields, setErrorFields] = useState([]);
  const onSubmit = (values) => {
    if (values.errorFields) {
      console.log('error');
      setErrorFields(values.errorFields);
      return;
    }
    const payload = {
      forgotId,
      password: md5(values.password),
    };
    resetPassword(payload).then((result) => {
      /**
       * 如果失败显示错误信息
       */
      if (result.error_code !== ResponseCode.success) {
        message.error(result.message || ' ');
        return;
      }

      /**
       * @todo setShowResult
       * 如果成功显示成功信息
       */
      setShowResult(true);
    });
  };

  const backToLogin = () => {
    history.replace('/sign/signin');
  };

  if (showResult) {
    return (
      <Container
        style={{
          width: '500px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        border={false}
      >
        <div className={`${prefix}-up-title`} style={{ textAlign: 'center' }}>
          Success
        </div>

        <div
          className={`${prefix}-up-subtitle`}
          style={{ textAlign: 'center' }}
        >
          <p>Your password has been changed. </p>
          <p>Please use your new password to sign in.</p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button type="primary" style={{ width: 357 }} onClick={backToLogin}>
            Back to sign in
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container style={{ width: '360px' }}>
      <div className={`${prefix}-up-title`}>Reset password</div>

      <div className={`${prefix}-up-subtitle`}>
        Enter your new password below.
      </div>

      <Form form={form} layout="vertical">
        <FormItem
          form={form}
          errorFields={errorFields}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter a valid password.',
            },
            {
              required: true,
              type: 'string',
              min: 8,
              message: 'Please choose a password with 8 or more characters.',
            },
          ]}
          render={({ checkFormItemStatus }) => {
            return (
              <Input.Password
                placeholder="Password 8+ character"
                onChange={checkFormItemStatus}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            );
          }}
        />
        <FormItem
          form={form}
          errorFields={errorFields}
          label="Confirm password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject(
                  'Passwords do not match. Please try again.',
                );
              },
            }),
          ]}
          render={({ checkFormItemStatus }) => {
            return (
              <Input.Password
                placeholder="Confirm password"
                onChange={checkFormItemStatus}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            );
          }}
        />

        <SignButton form={form} submit={onSubmit}>
          Reset Password
        </SignButton>
        {/* <Button form={form} submit={onSubmit} loading={loading}>
          Reset Password
        </Button> */}
      </Form>
    </Container>
  );
}

export default ResetPage;
