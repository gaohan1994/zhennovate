/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-01 14:24:56
 */
import React from 'react';
import { Form, Checkbox, message, Row, Col, Radio } from 'antd';
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

  const onSignIn = () => {
    history.push(`/sign/signin`);
  };
  return (
    <Container>
      <div className={`${prefix}-up-title`}>Join us</div>
      <div className={`${prefix}-up-subtitle`}>Start your journey today!</div>
      <Form form={form} layout="vertical">
        <Form.Item label="Are you joining through an organization?">
          <Row>
            <Col span={12}>
              <Radio>Yes!</Radio>
            </Col>
            <Col span={12}>
              <Radio>Nope, it’s just me. </Radio>
            </Col>
          </Row>
        </Form.Item>

        <Row gutter={8}>
          <Col span={12}>
            <FormItem
              label="First Name"
              name="firstname"
              inputProps={{
                placeholder: 'First Name',
              }}
              rules={[
                {
                  required: true,
                  message: 'Please enter your first name.',
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <FormItem
              label="Last Name"
              name="lastname"
              inputProps={{
                placeholder: 'Last Name',
              }}
              rules={[
                {
                  required: true,
                  message: 'Please enter your last name.',
                },
              ]}
            />
          </Col>
        </Row>

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
                  I agree to Zhennovate’s{' '}
                  <span common-touch="touch">Terms</span> and{' '}
                  <span common-touch="touch">Privacy Policy</span>
                </span>
              </Checkbox>
            );
          }}
        />
        <SignButton form={form} submit={onSubmit}>
          Sign up
        </SignButton>

        <section className={`${prefix}-tips`}>
          Already have an account? Please
          <span common-touch="touch" onClick={onSignIn}>
            sign in.
          </span>
        </section>
      </Form>
    </Container>
  );
}
