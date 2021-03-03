/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-01 00:10:09
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

export default function SignIn(props) {
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

      // 说明从别的路由来的
      if (props.location.state && props.location.state.from) {
        history.push(`${props.location.state.from.pathname}`);
        return;
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

  const onForgotPassword = () => {
    history.push(`/sign/forgot`);
  };

  const onSignUp = () => {
    history.push(`/sign/signup`);
  };

  return (
    <Container>
      <div className={`${prefix}-up-title`}>Welcome back</div>
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
          label={
            <div className={`${prefix}-label`}>
              <span>Password</span>
              <h3 common-touch="touch" onClick={onForgotPassword}>
                Forgot password?
              </h3>
            </div>
          }
          name="password"
          style={{ marginBottom: 24 }}
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

        <p style={{ marginBottom: 24 }}>
          Your sign-in will be automatically remembered on this device, unless
          you delete the cache on this browser.
        </p>

        {/* <Checkbox style={{ marginBottom: 14 }}>Remember me</Checkbox> */}

        <Button form={form} submit={onSubmit} loading={loading}>
          Sign in
        </Button>

        <section className={`${prefix}-tips`}>
          Don’t have an account?{' '}
          <span common-touch="touch" onClick={onSignUp}>
            Sign up.
          </span>
        </section>
      </Form>
    </Container>
  );
}
