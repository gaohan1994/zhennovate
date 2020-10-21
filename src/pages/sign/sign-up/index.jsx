/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 11:56:35
 */
import React from 'react';
import { Form, notification, Checkbox } from 'antd';
import md5 from 'blueimp-md5';
import { register } from '../constants';
import Container from '../component/container';
import FormItem from '../component/form-item';
import SignButton from '../component/button';
import '../index.less';

const prefix = 'sign-page';

export default function SignUp() {
  const [form] = Form.useForm();

  /**
   * 注册
   * @param {*} values
   */
  const onSubmit = async (values) => {
    try {
      console.log('values', values);
      const payload = {
        // ...values,
        email: values.email,
        password: md5(values.password),
      };
      const result = await register(payload);
      console.log('result', result);
      // invariant(result)
    } catch (error) {
      notification.error({ message: error.message });
    }
  };
  return (
    <Container>
      <div className={`${prefix}-up-title`}>Join us</div>
      <div className={`${prefix}-up-subtitle`}>Start your journey today!</div>
      <Form form={form} layout="vertical">
        <FormItem
          label="Full Name"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter your name.',
            },
          ]}
        />
        <FormItem
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'This doesn’t look like an email address.Please check it for typos and try again.',
            },
          ]}
        />
        <FormItem
          label="Password"
          name="password"
          inputProps={{ type: 'password' }}
          rules={[
            {
              required: true,
              type: 'string',
              min: 8,
              message: 'Please use 8+ characters for secure password.',
            },
          ]}
        />
        <FormItem
          name="policy"
          valuePropName="checked"
          rules={[
            {
              required: true,
              type: 'boolean',
              message: 'Please agree with the terms to sign up.',
            },
          ]}
          render={() => {
            return (
              <Checkbox>
                <span className={`${prefix}-up-policy`}>I agree to Zhennovate’s Terms and Privacy Policy</span>
              </Checkbox>
            );
          }}
        />
        <SignButton form={form} submit={onSubmit} />
      </Form>
    </Container>
  );
}
