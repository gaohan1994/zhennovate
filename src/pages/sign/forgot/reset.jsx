/**
 * 忘记密码页面
 * @Author: centerm.gaohan
 * @Date: 2020-12-18 11:37:00
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-02 10:23:32
 */
import React, { useState } from 'react';
import Container from '../component/container';
import '../index.less';
import FormItem from '../component/form-item';
import { Form, message, Button, Input } from 'antd';
import md5 from 'blueimp-md5';
// import Button from '../component/button';
import SignButton from '../component/button';
import { resetPassword } from '../constants';
import { ResponseCode } from '@/common/config';
import { useHistory } from 'react-router-dom';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const prefix = 'sign-page';

function ResetPage(props) {
  const { forgotId } = props.match.params;
  console.log('[重置密码的forgotId]', forgotId);
  const [form] = Form.useForm();
  const history = useHistory();
  console.log('history', history);

  const [showResult, setShowResult] = useState(false);

  const onSubmit = (values) => {
    console.log('onSubmit');

    const payload = {
      forgotId,
      password: md5(values.password),
    };
    resetPassword(payload).then((result) => {
      console.log('[result]', result);

      /**
       * 如果失败显示错误信息
       */
      if (result.error_code !== ResponseCode.success) {
        message.error(result.msg || ' ');
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
      <Container style={{ width: '360px', alignItems: 'center' }}>
        <div className={`${prefix}-up-title`}>Success</div>

        <div
          className={`${prefix}-up-subtitle`}
          style={{ textAlign: 'center' }}
        >
          Your password has been changed.
        </div>

        <Button type="primary" style={{ width: 156 }} onClick={backToLogin}>
          Back to log in
        </Button>
      </Container>
    );
  }

  return (
    <Container style={{ width: '360px' }}>
      <div className={`${prefix}-up-title`}>Reset password</div>

      <div className={`${prefix}-up-subtitle`}>
        Enter your new password below
      </div>

      <Form form={form} layout="vertical">
        <FormItem
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              type: 'string',
              min: 8,
              message: 'Please use 8+ characters for secure password.',
            },
          ]}
          render={() => {
            return (
              <Input.Password
                placeholder="Password 8+ character"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            );
          }}
        />
        <FormItem
          label="Confirm password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              type: 'string',
              min: 8,
              message: 'Please use 8+ characters for secure password.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject(
                  'The two passwords that you entered do not match!',
                );
              },
            }),
          ]}
          render={() => {
            return (
              <Input.Password
                placeholder="Confirm password"
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
