/* eslint-disable no-unused-vars */
/**
 * Form Item组件 不在form里显示错误信息统一由message处理
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 09:40:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-03 17:42:46
 */
import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default (props) => {
  const history = useHistory();
  const {
    form,
    name,
    render,
    inputProps = {},
    message,
    errorFields = [],
    ...rest
  } = props;

  const [help, setHelp] = useState('');
  const [validateStatus, setValidateStatus] = useState('');

  useEffect(() => {
    if (typeof errorFields === 'string') {
      if (/password/i.test(errorFields) && name === 'password') {
        console.log('password');
        setHelp(errorFields);
        setValidateStatus('error');
      } else if (/email/i.test(errorFields) && name === 'email') {
        console.log('email');
        setHelp(errorFields);
        setValidateStatus('error');
      }
    }
  }, [errorFields]);

  /**
   * 如果外部传入errorFields
   */
  useEffect(() => {
    if (Array.isArray(errorFields) && errorFields.length > 0) {
      const errorFieldIndex = errorFields.findIndex(
        (ef) => ef.name[0] === name,
      );

      if (errorFieldIndex >= 0) {
        const currentErrorField = errorFields[errorFieldIndex];
        setHelp(currentErrorField.errors[0] || '');
        setValidateStatus('error');
      }
    }
  }, [errorFields]);

  const checkFormItemStatus = async () => {
    if (form) {
      form
        .validateFields([name])
        .then((result) => {
          setValidateStatus('');
          setHelp('');
        })
        .catch((error) => {
          setValidateStatus('error');
          setHelp(error.errorFields[0]?.errors[0] || '');
        });
    }
  };

  const inputFormProps = {
    onChange: checkFormItemStatus,
    ...inputProps,
  };

  const onSign = () => {
    history.push(`/sign/signin`);
  };

  return (
    <Form.Item
      {...rest}
      name={name}
      help={
        help && (
          <div style={{ marginTop: 5 }}>
            <CloseCircleFilled />
            <span style={{ marginLeft: 5, color: '#48515a', fontSize: 12 }}>
              {help}
              {help === 'Email address is already in use.' && (
                <span>
                  Please{' '}
                  <span
                    style={{ color: '#1890ff' }}
                    common-touch="touch"
                    onClick={onSign}
                  >
                    sign in.
                  </span>
                </span>
              )}
            </span>
          </div>
        )
      }
      validateStatus={validateStatus}
    >
      {render ? render({ checkFormItemStatus }) : <Input {...inputFormProps} />}
    </Form.Item>
  );
};
