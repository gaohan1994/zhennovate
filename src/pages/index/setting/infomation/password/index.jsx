import React, { useState } from 'react';
import '../../index.less';
import { Card, Form, Row, Col, Input, message } from 'antd';
import FormItem from '@/pages/sign/component/form-item';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { changePassword } from '../../constants';
import { ResponseCode } from '@/common/config';
import invariant from 'invariant';
import md5 from 'blueimp-md5';

const prefix = 'setting';

function InfomationPassword() {
  const [form] = Form.useForm();
  const { userId } = useSignSdk();
  const [errorFields, setErrorFields] = useState([]);

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        userId,
        curPassword: md5(values.password),
        newPassword: md5(values.newpassword),
      };
      const result = await changePassword(payload);
      invariant(
        result.error_code === ResponseCode.success,
        result.message || ' ',
      );
      message.success('Your changes were saved.');
    } catch (error) {
      error.errorFields && setErrorFields(error.errorFields);
      error.message && setErrorFields(error.message);
    }
  };

  return (
    <Card title="Change password" className={`${prefix}-card`}>
      <Form form={form} layout="vertical">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <FormItem
              form={form}
              errorFields={errorFields}
              label="Current password"
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
                  message:
                    'Please choose a password with 8 or more characters.',
                },
              ]}
              inputProps={{
                placeholder: 'Enter current password',
              }}
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
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <FormItem
              form={form}
              errorFields={errorFields}
              label="New password"
              name="newpassword"
              rules={[
                {
                  required: true,
                  message: 'Please enter a valid password.',
                },
                {
                  required: true,
                  type: 'string',
                  min: 8,
                  message:
                    'Please choose a password with 8 or more characters.',
                },
              ]}
              inputProps={{
                placeholder: 'Enter new password',
              }}
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
          </Col>
          <Col span={12}>
            <FormItem
              form={form}
              errorFields={errorFields}
              label="Confirm password"
              name="confirmpassword"
              dependencies={['newpassword']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newpassword') === value) {
                      return Promise.resolve();
                    }
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject(
                      'Passwords do not match. Please try again.',
                    );
                  },
                }),
              ]}
              inputProps={{
                placeholder: 'Enter new password',
              }}
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
          </Col>
        </Row>

        <h3
          className={`${prefix}-card-save`}
          common-touch="touch"
          onClick={onSubmit}
        >
          Save
        </h3>
      </Form>
    </Card>
  );
}

export default InfomationPassword;
