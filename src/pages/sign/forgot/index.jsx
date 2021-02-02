/**
 * 忘记密码页面
 * @Author: centerm.gaohan
 * @Date: 2020-12-18 11:37:00
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-01 15:37:14
 */
import React, { useState } from 'react';
import Container from '../component/container';
import '../index.less';
import FormItem from '../component/form-item';
import { Form, message, Button } from 'antd';
// import Button from '../component/button';
import SignButton from '../component/button';
import { forgotEmail } from '../constants';
import { ResponseCode } from '@/common/config';
import { useHistory } from 'react-router-dom';

const prefix = 'sign-page';

export default () => {
  const history = useHistory();
  const [form] = Form.useForm();
  // const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const onSubmit = (values) => {
    try {
      // setLoading(true);
      forgotEmail(values).then((result) => {
        console.log('[result]', result);
        if (result.error_code !== ResponseCode.success) {
          message.error(result.msg || ' ');
          return;
        }

        setShowResult(true);
      });
    } catch (error) {
      message.error(error.message);
    }
  };

  const backToSignin = () => {
    history.replace('/sign/signin');
  };

  if (showResult) {
    return (
      <Container style={{ width: '360px', alignItems: 'center' }}>
        <div className={`${prefix}-up-title`}>Thank you!</div>

        <div
          className={`${prefix}-up-subtitle`}
          style={{ textAlign: 'center' }}
        >
          We’ve sent password reset instructions to your email address. If no
          email is received within ten minutes, check if the submitted address
          is correct.
        </div>

        <Button type="primary" style={{ width: 156 }} onClick={backToSignin}>
          Back to sign in
        </Button>
      </Container>
    );
  }

  return (
    <Container style={{ width: '360px' }}>
      <div className={`${prefix}-up-title`}>Forgot Password?</div>
      <div className={`${prefix}-up-subtitle`}>
        Enter the email you’re using for your account
      </div>
      <Form form={form} layout="vertical">
        <FormItem
          label="Email Address"
          name="email"
          inputProps={{
            placeholder: 'Email Address',
          }}
          rules={[
            {
              required: true,
              type: 'email',
              message:
                'This doesn’t look like an email address.Please check it for typos and try again.',
            },
          ]}
        />

        <SignButton form={form} submit={onSubmit}>
          Reset Password
        </SignButton>
        {/* <Button form={form} submit={onSubmit} loading={loading}>
          Reset Password
        </Button> */}

        <div
          className={`${prefix}-up-forgot`}
          onClick={() => {
            history.back();
          }}
          style={{
            textAlign: 'center',
            color: '#1b2631',
            marginTop: 24,
            fontSize: 14,
          }}
          common-touch="touch"
        >
          Back to sign in
        </div>
      </Form>
    </Container>
  );
};
