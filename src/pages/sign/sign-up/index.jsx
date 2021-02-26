/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-26 17:43:47
 */
import React, { useState, useEffect } from 'react';
import { Form, Checkbox, message, Row, Col, Radio, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { isOrganization, userRegisterV2 } from '../constants';
import Container from '../component/container';
import FormItem from '../component/form-item';
import SignButton from '../component/button';
import '../index.less';
import { ResponseCode } from '@/common/config';

const prefix = 'sign-page';

const SignUpType = {
  Organization: 'Organization',
  Normal: 'Normal',
};

export default function SignUp() {
  const history = useHistory();
  const [form] = Form.useForm();

  /**
   * @params signUpType 注册的类型 是否是组织类型
   */
  const [signUpType, setSignUpType] = useState(SignUpType.Organization);

  useEffect(() => {}, [signUpType]);

  const checkOrganizationEmail = async (email) => {
    const result = await isOrganization(email);
    if (result.error_code === ResponseCode.success) {
      return result.data;
    } else {
      message.error(result.message || ' ');
      return { organization: null };
    }
  };

  /**
   * @todo 失去焦点的时候判断如果是 Organzation 则校验email
   */
  const onInputBlur = () => {
    const email = form.getFieldValue('email');
    if (email && signUpType === SignUpType.Organization) {
      const organization = checkOrganizationEmail({ email });
      if (organization.organization) {
        console.log('organization');
      }
    }
  };

  /**
   * 注册
   * @param {*} values
   */
  const onSubmit = async (values) => {
    try {
      const payload = {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
      };
      userRegisterV2(payload).then((result) => {
        if (result.code !== ResponseCode.success) {
          message.error(result.message || ' ');
        }
      });
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
      <Form
        form={form}
        layout="vertical"
        initialValues={{ signtype: SignUpType.Organization }}
      >
        <Form.Item
          label="Are you joining through an organization?"
          name="signtype"
        >
          <Radio.Group
            style={{ width: '100%' }}
            onChange={(e) => setSignUpType(e.target.value)}
          >
            <Row>
              <Col span={12}>
                <Radio value={SignUpType.Organization}>Yes!</Radio>
              </Col>
              <Col span={12}>
                <Radio value={SignUpType.Normal}>Nope, it’s just me. </Radio>
              </Col>
            </Row>
          </Radio.Group>
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

        <Form.Item
          hasFeedback
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
        >
          <Input placeholder="Email Address" onBlur={onInputBlur} />
        </Form.Item>
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
