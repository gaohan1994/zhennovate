/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-26 17:48:10
 */
import React from 'react';
import { Form, message, Input } from 'antd';
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

export default function SetPassword(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const setPasswordId = props.match.params.setpasswordid;

  /**
   * 注册
   * @param {*} values
   */
  const onSubmit = async (values) => {
    try {
      const payload = {
        verificationId: setPasswordId,
        password: md5(values.password),
      };
      console.log('payload', payload);
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
      <div className={`${prefix}-up-title`} style={{ textAlign: 'center' }}>
        Welcome!
      </div>
      <div className={`${prefix}-check-text`} style={{ textAlign: 'center' }}>
        <p>You are enrolled through</p>
        <p style={{ fontWeight: 'bold' }}>[Name of Organization]</p>
      </div>
      <Form form={form} layout="vertical">
        <FormItem
          style={{ marginTop: 30 }}
          label="Create a password"
          name="password"
          rules={[
            {
              required: true,
              type: 'string',
              min: 8,
              message: 'Please choose a password with 8 or more characters.',
            },
          ]}
          render={() => {
            return (
              <Input.Password
                placeholder="Password 8+ characters"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            );
          }}
        />
        <FormItem
          label="Confirm password"
          name="confirmpassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              type: 'string',
              min: 8,
              message: 'Please use 8+ characters for secure password.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('Please confirm your password');
              },
            }),
          ]}
          render={() => {
            return (
              <Input.Password
                placeholder="Confirm password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            );
          }}
        />
        <SignButton form={form} submit={onSubmit}>
          Create password
        </SignButton>
      </Form>
    </Container>
  );
}
