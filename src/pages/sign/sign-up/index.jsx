/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-28 23:36:05
 */
import React, { useState, useEffect } from 'react';
import { Form, Checkbox, message, Row, Col, Radio, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { isOrganization } from '../constants';
import Container from '../component/container';
import FormItem from '../component/form-item';
import SignButton from '../component/button';
import '../index.less';
import { ResponseCode } from '@/common/config';
import imginvite from '../../../assets/Invite-Illustration.png';
import { jsonToQueryString } from '@/common/request';

const prefix = 'sign-page';

const SignUpType = {
  Organization: 'Organization',
  Normal: 'Normal',
};

const RenderType = {
  SignUp: 'SignUp',
  Result: 'Result',
};

export default function SignUp() {
  const history = useHistory();
  const [form] = Form.useForm();

  /**
   * @params signUpType 注册的类型 是否是组织类型
   */
  const [signUpType, setSignUpType] = useState(SignUpType.Organization);

  /**
   * @param {renderType} 渲染的类型
   *
   */
  const [renderType, setRenderType] = useState(RenderType.SignUp);
  // const [renderType, setRenderType] = useState(RenderType.Result);

  useEffect(() => {}, [signUpType]);

  const checkOrganizationEmail = async (email) => {
    const result = await isOrganization({ email });
    if (result.error_code === ResponseCode.success) {
      return result.data;
    } else {
      return { organization: null };
    }
  };

  /**
   * @todo 失去焦点的时候判断如果是 Organzation 则校验email
   */
  const onInputBlur = async () => {
    const email = form.getFieldValue('email');
    if (email && signUpType === SignUpType.Organization) {
      const organization = await checkOrganizationEmail(email);
      console.log('organization', organization);
      if (organization.organization) {
        console.log('organization');
      } else {
        message.error('organization null');
      }
    }
  };

  /**
   * 注册
   * @param {*} values
   */
  const onSubmit = async (values) => {
    try {
      if (signUpType === SignUpType.Normal) {
        /**
         * @todo 非组织的用户暂时不开发注册
         */
        setRenderType(RenderType.Result);
        return;
      }

      const checkResult = await checkOrganizationEmail(values.email);

      if (!checkResult.organization) {
        throw new Error('organization null');
      }

      const payload = {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        organizationName: checkResult.organization.Name,
        organizationId: checkResult.organization._id,
      };
      history.push(`/sign/setpassword${jsonToQueryString(payload)}`);
    } catch (error) {
      console.log('[报错信息]', error);
      message.error(error.message);
    }
  };

  const onSignIn = () => {
    history.push(`/sign/signin`);
  };
  const onTerms = (e) => {
    e.stopPropagation();
    window.open('https://zhennovate.com/terms', 'zhennovate-terms');
  };
  const onPolicy = (e) => {
    e.stopPropagation();
    window.open('https://zhennovate.com/privacy', 'zhennovate-privacy');
  };
  const onHome = () => {
    history.push(`/home`);
  };

  if (renderType === RenderType.SignUp) {
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
                    <span common-touch="touch" onClick={onTerms}>
                      Terms
                    </span>{' '}
                    and{' '}
                    <span common-touch="touch" onClick={onPolicy}>
                      Privacy Policy
                    </span>
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

  return (
    <Container border={false}>
      <section className={`${prefix}-result`}>
        <img className={`${prefix}-invite`} alt="" src={imginvite} />
        <h1>Thank you for signing up!</h1>
        <p>暂时还未开放非机构用户注册.</p>
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
