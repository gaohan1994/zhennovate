/**
 * 忘记密码页面
 * @Author: centerm.gaohan
 * @Date: 2020-12-18 11:37:00
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-31 17:16:39
 */
import React, { useState } from 'react';
import Container from '../component/container';
import '../index.less';
import FormItem from '../component/form-item';
import { Form } from 'antd';
import Button from '../component/button';

const prefix = 'sign-page';

export default () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
  };
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
              message: 'Please enter your email.',
            },
          ]}
        />
        <Button form={form} submit={onSubmit} loading={loading}>
          Reset Password
        </Button>

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
