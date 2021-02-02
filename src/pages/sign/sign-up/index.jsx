/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-01 14:24:56
 */
import React from 'react';
import { Form, Checkbox, message, Input } from 'antd';
import md5 from 'blueimp-md5';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../constants';
import Container from '../component/container';
import FormItem from '../component/form-item';
import SignButton from '../component/button';
import invariant from 'invariant';
import '../index.less';
import { Action_Types } from '../store/sign-store';
import { formatSearch } from '@/common/request';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const prefix = 'sign-page';

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
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
      const result = await register(payload);
      console.log('[注册返回结果]', result);
      invariant(result.error_code === 0, result.message || ' ');

      dispatch({
        type: Action_Types.Receive_Userinfo,
        payload: result.data,
      });

      setTimeout(() => {
        if (history.location.search.length > 0) {
          const params = formatSearch(history.location.search);
          if (params.forward_url) {
            const forwardUrl = decodeURIComponent(params.forward_url);
            history.push(forwardUrl);
            return;
          }
        }
      }, 1000);

      history.push(
        `/sign/check${
          history.location.search
          // ? `${history.location.search}&userId=${'userId'}`
          // : `?userId=${'userId'}`
        }`,
      );
    } catch (error) {
      console.log('[报错信息]', error);
      message.error(error.message);
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
          inputProps={{
            placeholder: 'Name',
          }}
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
                placeholder="password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            );
          }}
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
