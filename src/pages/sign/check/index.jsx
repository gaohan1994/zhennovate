/**
 * @TODO 注册
 * @Author: centerm.gaohan
 * @Date: 2020-10-20 22:21:49
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-28 11:16:55
 */
import React, { useState } from 'react';
import Container from '../component/container';
import '../index.less';
import { Form } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import FormItem from '../component/form-item';

const prefix = 'sign-page';

export default () => {
  const [form] = Form.useForm();

  // 显示loading
  // const [loading, setLoading] = useState(false);

  // 右侧的icon显示
  const [showSuffix, setShowSuffix] = useState(false);

  const onInput = (event) => {
    if (event.target.value.length === 6) {
      setShowSuffix(true);
    }
  };

  const getSuffix = () => {
    if (showSuffix) {
      return <CheckCircleFilled />;

      // return <CloseCircleFilled />;
    }
    return <div />;
  };

  return (
    <Container>
      <div className={`${prefix}-up-title`}>Check your email</div>
      <div className={`${prefix}-check-text`}>
        We’ve sent you a six-digit confirmation code to{' '}
        <span style={{ fontWeight: 'bold' }}>[ user email ].</span> Please enter
        it below to confirm your email address.
      </div>
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 24 }}
        onChange={onInput}
      >
        <FormItem
          name="confirmationCode"
          inputProps={{
            placeholder: 'Enter 6 - digit code',
            maxLength: 6,
            suffix: getSuffix(),
          }}
        />
      </Form>
      <div className={`${prefix}-check-text`}>
        <span className={`${prefix}-check-url`} style={{ color: '#1890ff' }}>
          Send code again
        </span>
        {` or find more information in`}
        <span className={`${prefix}-check-url`} style={{ color: '#1890ff' }}>
          Help Center.
        </span>
      </div>
    </Container>
  );
};
