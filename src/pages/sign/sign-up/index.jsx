/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-11-18 15:58:20
 */
import React from 'react';
import { Form, notification, Checkbox } from 'antd';
import md5 from 'blueimp-md5';
import { register, signin } from '../constants';
import Container from '../component/container';
import FormItem from '../component/form-item';
import SignButton from '../component/button';
import invariant from 'invariant';
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
      const payload = {
        email: values.email,
        name: values.name,
        password: md5(values.password),
      };
      console.log('payload', payload);
      const result = await register(payload);
      console.log('result', result);
      invariant(result.error_code === 0, result.message || ' ');

      const signinResult = await signin({
        email: values.email,
        password: md5(values.password),
      });
      invariant(signinResult.error_code === 0, signinResult.message || ' ');
      // data: {_id: "5fb373ad194f21052f809d36", CreateAt: "2020-11-17T06:54:37.729Z", __v: 0}
      // CreateAt: "2020-11-17T06:54:37.729Z"
      // __v: 0
      // _id: "5fb373ad194f21052f809d36"
      // error_code: 0
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
          name="name"
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
              message:
                'This doesn’t look like an email address.Please check it for typos and try again.',
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
              type: 'enum',
              enum: [true],
              message: 'Please agree with the terms to sign up.',
            },
          ]}
          render={() => {
            return (
              <Checkbox>
                <span className={`${prefix}-up-policy`}>
                  I agree to Zhennovate’s Terms and Privacy Policy
                </span>
              </Checkbox>
            );
          }}
        />
        <SignButton form={form} submit={onSubmit}>
          Sign up
        </SignButton>
      </Form>
    </Container>
  );
}
