/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-11-18 16:55:11
 */
import React from 'react';
import { Form, message } from 'antd';
import md5 from 'blueimp-md5';
import Container from '../component/container';
import FormItem from '../component/form-item';
import '../index.less';
import signSdk from '../store/sign-sdk';
import { useHistory } from 'react-router-dom';
import Button from '../component/button';

const prefix = 'sign-page';

export default function SignIn() {
  const [form] = Form.useForm();
  const history = useHistory();
  const { userSignin } = signSdk();

  const loginCallback = () => {
    history.replace(`/program`);
  };

  const onSubmit = async () => {
    try {
      const fields = await form?.validateFields();
      userSignin(
        {
          email: fields.email,
          password: md5(fields.password),
        },
        loginCallback,
      );
    } catch (error) {
      error.errorFields &&
        error.errorFields[0]?.errors[0] &&
        message.error({
          content: error.errorFields[0]?.errors[0],
        });

      error.message &&
        message.error({
          content: error.message,
        });
    }
  };

  return (
    <Container>
      <div className={`${prefix}-up-title`}>Sign In</div>
      <Form form={form} layout="vertical">
        <FormItem
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email.',
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
              message: 'Please enter your password.',
            },
          ]}
        />

        <Button form={form} submit={onSubmit}>
          Sign in
        </Button>
      </Form>
    </Container>
  );
}
