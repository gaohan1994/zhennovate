/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-28 16:26:44
 */
import React, { useState } from 'react';
import { Form, message, Input } from 'antd';
import md5 from 'blueimp-md5';
import Container from '../component/container';
import FormItem from '../component/form-item';
import '../index.less';
import signSdk from '../store/sign-sdk';
import { useHistory } from 'react-router-dom';
import Button from '../component/button';
import { formatSearch } from '@/common/request';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const prefix = 'sign-page';

export default function SignIn() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { userSignin } = signSdk();

  const loginCallback = () => {
    setLoading(false);

    setTimeout(() => {
      if (history.location.search.length > 0) {
        const params = formatSearch(history.location.search);
        if (params.forward_url) {
          const forwardUrl = decodeURIComponent(params.forward_url);
          history.push(forwardUrl);
          return;
        }
      }
      history.push('/home');
    }, 1000);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = await form?.validateFields();
      userSignin(
        {
          email: fields.email,
          password: md5(fields.password),
        },
        loginCallback,
      );
    } catch (error) {
      setLoading(false);
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
        <FormItem
          label="Password"
          name="password"
          style={{ marginBottom: 12 }}
          rules={[
            {
              required: true,
              message: 'Please enter your password.',
            },
          ]}
          render={() => {
            return (
              <Input.Password
                placeholder="password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            );
          }}
        />

        <div
          className={`${prefix}-up-forgot`}
          onClick={() => {
            history.push('/sign/forgot');
          }}
        >
          Forgot Password?
        </div>

        <Button form={form} submit={onSubmit} loading={loading}>
          Sign in
        </Button>
      </Form>
    </Container>
  );
}
