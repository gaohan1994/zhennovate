/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-17 10:39:30
 */
import React, { useState, useEffect } from 'react';
import { Form, Checkbox, Row, Col, Radio, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { isOrganization } from '../constants';
import Container from '../component/container';
import FormItem, { getErrorFields } from '../component/form-item';
import SignButton from '../component/button';
import '../index.less';
import { ResponseCode } from '@/common/config';
import imginvite from '../../../assets/Invite-Illustration.png';
import { jsonToQueryString } from '@/common/request';
import { CloseCircleFilled } from '@ant-design/icons';
import { merge } from 'lodash';

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

  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {}, [signUpType]);

  const checkOrganizationEmail = async (email) => {
    const result = await isOrganization({ email });
    return result;
  };

  /**
   * @todo 失去焦点的时候判断如果是 Organzation 则校验email
   */
  const onInputBlur = async () => {
    form
      .validateFields(['email'])
      .then(async (result) => {
        const email = form.getFieldValue('email');

        const checkResult = await checkOrganizationEmail(email);
        if (checkResult.error_code !== ResponseCode.success) {
          setErrorFields(
            getErrorFields(
              'email',
              checkResult.message
                ? checkResult.message
                : 'Please enter the email address associated with your sign-up invitation.',
            ),
          );
        } else {
          setErrorFields(getErrorFields('email', []));
        }
      })
      .catch((error) => {
        console.log('error', error);
        setErrorFields(error.errorFields[0]?.errors[0] || '');
      });
  };

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

      /**
       * @todo 修改注册流程
       * 不管选择的是yes还是nope，首先都校验email
       * 如果校验出来在机构中，不管选择如何都进行注册
       * 如果不在机构中在进行判断，用户选择nope时显示对应信息
       */
      const checkResult = await checkOrganizationEmail(values.email);
      if (checkResult.error_code !== ResponseCode.success) {
        // setErrorFields(checkResult.message);

        setErrorFields(
          checkResult.message
            ? checkResult.message
            : 'Please enter the email address associated with your sign-up invitation.',
        );

        if (signUpType === SignUpType.Normal) {
          setRenderType(RenderType.Result);
        }
        return;
      }

      const payload = {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        organizationName:
          checkResult.data && checkResult.data.organization.Name,
        organizationId: checkResult.data && checkResult.data.organization._id,
      };
      history.push(`/sign/setpassword${jsonToQueryString(payload)}`);
    } catch (error) {
      console.log('[报错信息]', error);
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

  const checkFormItemStatus = async (name) => {
    form
      .validateFields([name])
      .then((result) => {
        /**
         * 如果当前name有errorfields，则去掉
         */
        if (errorFields.some((ef) => ef.name[0] === name)) {
          const index = errorFields.findIndex((ef) => ef.name[0] === name);
          const nextErrorFields = merge([], errorFields);
          nextErrorFields.splice(index, 1);
          setErrorFields(nextErrorFields);
        }
      })
      .catch((error) => {
        if (error.errorFields) {
          if (Array.isArray(errorFields) && errorFields.length > 0) {
            setErrorFields(errorFields.concat(error.errorFields));
          } else {
            setErrorFields(error.errorFields);
          }
        }
      });
  };

  if (renderType === RenderType.SignUp) {
    const showFullNameErrorToken =
      Array.isArray(errorFields) &&
      errorFields &&
      errorFields.some(
        (ef) => ef.name[0] === 'lastname' || ef.name[0] === 'firstname',
      );

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
            style={{ marginBottom: 16 }}
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
              <Form.Item
                style={{ marginBottom: 0 }}
                label="First name"
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your first name.',
                  },
                ]}
                help=""
                validateStatus={
                  Array.isArray(errorFields) &&
                  errorFields &&
                  errorFields.some((ef) => ef.name[0] === 'firstname')
                    ? 'error'
                    : ''
                }
              >
                <Input
                  placeholder="First name"
                  onChange={() => checkFormItemStatus('firstname')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Last name"
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your last name.',
                  },
                ]}
                help=""
                validateStatus={
                  Array.isArray(errorFields) &&
                  errorFields &&
                  errorFields.some((ef) => ef.name[0] === 'lastname')
                    ? 'error'
                    : ''
                }
              >
                <Input
                  placeholder="Last name"
                  onChange={() => checkFormItemStatus('lastname')}
                />
              </Form.Item>
            </Col>
            {showFullNameErrorToken && (
              <div style={{ marginTop: 5, marginLeft: 4 }}>
                <CloseCircleFilled style={{ color: '#ff4d4f' }} />
                <span style={{ marginLeft: 5, color: '#48515a', fontSize: 12 }}>
                  Please enter full name.
                </span>
              </div>
            )}
          </Row>

          <FormItem
            form={form}
            errorFields={errorFields}
            label="Email address"
            name="email"
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
            render={() => {
              return (
                <Input
                  placeholder="Email address"
                  onBlur={() => {
                    onInputBlur();
                  }}
                />
              );
            }}
          />
          <FormItem
            form={form}
            errorFields={errorFields}
            name="policy"
            valuePropName="checked"
            rules={[
              {
                required: true,
                type: 'enum',
                enum: [true],
                message: 'Please agree to the terms and conditions to sign up.',
              },
            ]}
            render={({ checkFormItemStatus }) => {
              return (
                <Checkbox onChange={checkFormItemStatus}>
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
    <Container border={false} style={{ width: 'auto' }}>
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
