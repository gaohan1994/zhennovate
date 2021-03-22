/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-22 12:02:34
 */
import React, { useState } from 'react';
import { Form, message, Input, Button } from 'antd';
import md5 from 'blueimp-md5';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegisterV2 } from '../constants';
import Container from '../component/container';
import FormItem from '../component/form-item';
import SignButton from '../component/button';
import invariant from 'invariant';
import '../index.less';
import { Action_Types, Action_Types_Black_Sign } from '../store/sign-store';
import { formatSearch } from '@/common/request';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import imginvite from '../../../assets/Invite-Illustration.png';

const prefix = 'sign-page';

const RenderType = {
  Password: 'Password',
  Result: 'Result',
};

export default function SetPassword(props) {
  const search = formatSearch(props.location.search);

  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  /**
   * @param {renderType} 渲染的类型
   *
   */
  const [renderType] = useState(RenderType.Password);

  const [errorFields, setErrorFields] = useState([]);

  /**
   * 注册
   * @param {*} values
   */
  const onSubmit = async (values) => {
    try {
      if (values.errorFields) {
        setErrorFields(values.errorFields);
        return;
      }

      const payload = {
        email: search.email,
        firstname: search.firstname,
        lastname: search.lastname,
        password: md5(values.password),
      };
      // console.log('payload', payload);
      const result = await userRegisterV2(payload);
      // const result = await register(payload);
      console.log('[注册返回结果]', result);
      invariant(result.error_code === 0, result.message || ' ');

      dispatch({
        type: Action_Types.Receive_Userinfo,
        payload: result.data,
      });

      dispatch({
        type: Action_Types_Black_Sign.Receive_Userinfo_Black,
        payload: result.data,
      });

      message.success('Confirmation code sent. Please check your email.');
      setTimeout(() => {
        history.push(`/sign/check${props.location.search}`);
      }, 100);
    } catch (error) {
      console.log('[报错信息]', error);
    }
  };

  const onHome = () => {
    history.push(`/home`);
  };

  if (renderType === RenderType.Password) {
    return (
      <Container>
        <div className={`${prefix}-up-title`} style={{ textAlign: 'center' }}>
          Welcome!
        </div>
        <div className={`${prefix}-check-text`} style={{ textAlign: 'center' }}>
          <p>You are enrolled through</p>
          <p style={{ fontWeight: 'bold' }}>{search.organizationName || ' '}</p>
        </div>
        <Form form={form} layout="vertical">
          <FormItem
            form={form}
            errorFields={errorFields}
            style={{ marginTop: 30 }}
            label="Create a password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter a valid password.',
              },
              {
                required: true,
                type: 'string',
                min: 8,
                message: 'Please choose a password with 8 or more characters.',
              },
            ]}
            render={({ checkFormItemStatus }) => {
              return (
                <Input.Password
                  onChange={checkFormItemStatus}
                  placeholder="Password 8+ characters"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              );
            }}
          />
          <FormItem
            form={form}
            errorFields={errorFields}
            label="Confirm password"
            name="confirmpassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject(
                    'Passwords do not match. Please try again.',
                  );
                },
              }),
            ]}
            render={({ checkFormItemStatus }) => {
              return (
                <Input.Password
                  onChange={checkFormItemStatus}
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

  return (
    <Container border={false}>
      <section className={`${prefix}-result`}>
        <img className={`${prefix}-invite`} alt="" src={imginvite} />
        <h1>Thank you for signing up!</h1>
        <p>We have added you to our invite-only waitlist.</p>
        <p>Stay tuned for upcoming offerings.</p>
        <Button
          onClick={onHome}
          type="primary"
          style={{ width: 323, marginTop: 24 }}
        >
          Return to home page
        </Button>
      </section>
    </Container>
  );
}
