/**
 * 忘记密码页面
 * @Author: centerm.gaohan
 * @Date: 2020-12-18 11:37:00
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-05 14:52:03
 */
import React, { useState } from 'react';
import Container from '../component/container';
import '../index.less';
import FormItem from '../component/form-item';
import { Form, Button } from 'antd';
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
  const [errorFields, setErrorFields] = useState([]);

  const onSubmit = (values) => {
    try {
      if (values.errorFields) {
        setErrorFields(values.errorFields);
        return;
      }
      // setLoading(true);
      forgotEmail(values).then((result) => {
        if (result.error_code !== ResponseCode.success) {
          setErrorFields(result.message || ' ');
          return;
        }

        setShowResult(true);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const backToSignin = () => {
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
          Thank you!
        </div>

        <div
          className={`${prefix}-up-subtitle`}
          style={{ textAlign: 'center' }}
        >
          <p>We’ve sent password reset instructions to your email address.</p>
          <p>If no email is recieved within 10 minutes, please check </p>
          <p>if the submitted email address is correct.</p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button type="primary" style={{ width: 367 }} onClick={backToSignin}>
            Back to sign in
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container style={{ width: '390px' }}>
      <div className={`${prefix}-up-title`}>Forgot Password?</div>
      <div className={`${prefix}-up-subtitle`}>
        Enter the email you’re using for your account
      </div>
      <Form form={form} layout="vertical">
        <FormItem
          form={form}
          errorFields={errorFields}
          label="Email address"
          name="email"
          validateTrigger="onBlur"
          inputProps={{
            placeholder: 'Email address',
          }}
          rules={[
            {
              required: true,
              message: 'Please enter your email address.',
            },
            {
              required: true,
              type: 'email',
              message: 'Please enter a valid email address.',
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
            // history.goBack();
            history.push(`/sign/signin`);
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
