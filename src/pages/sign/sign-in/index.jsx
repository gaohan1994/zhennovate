/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-05 14:47:30
 */
import React, { useState } from 'react';
import { Form, Input, Checkbox } from 'antd';
import md5 from 'blueimp-md5';
import Container from '../component/container';
import FormItem from '../component/form-item';
import '../index.less';
import { useHistory } from 'react-router-dom';
import Button from '../component/button';
import { formatSearch } from '@/common/request';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { signin } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Action_Types, Action_Types_Black_Sign } from '../store/sign-store';
import { ResponseCode } from '@/common/config';
import useSignSdk from '../store/sign-sdk';

const prefix = 'sign-page';

export default function SignIn(props) {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const rememberToken = useSelector((state) => state.sign.rememberToken);

  const { toggleRememberMe } = useSignSdk();

  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

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

      signin({
        email: fields.email,
        password: md5(fields.password),
      }).then((result) => {
        if (result.error_code === ResponseCode.success) {
          if (rememberToken === true) {
            dispatch({
              type: Action_Types.Receive_Userinfo,
              payload: result.data,
            });
          } else {
            dispatch({
              type: Action_Types_Black_Sign.Receive_Userinfo_Black,
              payload: result.data,
            });
          }
          loginCallback(result);
        } else {
          setErrorFields(result.message);
        }
      });
    } catch (error) {
      setLoading(false);

      error.errorFields && setErrorFields(error.errorFields);
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
          form={form}
          errorFields={errorFields}
          label="Email address"
          name="email"
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
        <FormItem
          form={form}
          errorFields={errorFields}
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
          render={({ checkFormItemStatus }) => {
            return (
              <Input.Password
                onChange={checkFormItemStatus}
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            );
          }}
        />

        {/* <p style={{ marginBottom: 24 }}>
          Your sign-in will be automatically remembered on this device, unless
          you delete the cache on this browser.
        </p> */}

        <Checkbox
          style={{ marginBottom: 14 }}
          onChange={toggleRememberMe}
          checked={rememberToken}
        >
          Remember me
        </Checkbox>

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
