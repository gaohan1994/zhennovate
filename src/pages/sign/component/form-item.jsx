/* eslint-disable no-unused-vars */
/**
 * Form Item组件 不在form里显示错误信息统一由message处理
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 09:40:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-17 10:37:54
 */
import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export function getErrorFields(name, errorMessage) {
  return [
    {
      name: [name],
      errors: Array.isArray(errorMessage) ? errorMessage : [errorMessage],
    },
  ];
}

export default (props) => {
  const history = useHistory();
  const {
    form,
    name,
    render,
    inputProps = {},
    message,
    style = {},
    errorFields = [],
    ...rest
  } = props;

  const [help, setHelp] = useState('');
  const [validateStatus, setValidateStatus] = useState('');

  useEffect(() => {
    if (typeof errorFields === 'string') {
      if (/password/i.test(errorFields) && name === 'password') {
        setHelp(errorFields);
        setValidateStatus('error');
      } else if (/email/i.test(errorFields) && name === 'email') {
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
        if (currentErrorField.errors[0]) {
          setHelp(currentErrorField.errors[0] || '');
          setValidateStatus('error');
        } else {
          setHelp('');
          setValidateStatus('');
        }
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
    onBlur: checkFormItemStatus,
    ...inputProps,
  };

  const onSign = () => {
    history.push(`/sign/signin`);
  };

  const onSignUp = () => {
    history.push(`/sign/signup`);
  };

  return (
    <Form.Item
      {...rest}
      name={name}
      style={{ marginTop: 12, ...style }}
      // validateTrigger="onBlur"
      help={
        help && (
          <div style={{ marginTop: 5 }}>
            <CloseCircleFilled />
            <span style={{ marginLeft: 5, color: '#48515a', fontSize: 12 }}>
              {help}
              {help === 'Email address is already in use.' && (
                <span>
                  {' Please '}
                  <span
                    style={{ color: '#1890ff' }}
                    common-touch="touch"
                    onClick={onSign}
                  >
                    sign in.
                  </span>
                </span>
              )}
              {help ===
                'This email address is not associated with an existing account.' && (
                <span>
                  {' Please '}
                  <span
                    style={{ color: '#1890ff' }}
                    common-touch="touch"
                    onClick={onSignUp}
                  >
                    sign up.
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
