/**
 * Form Item组件 不在form里显示错误信息统一由message处理
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 09:40:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 10:32:34
 */
import React from 'react';
import { Form, Input } from 'antd';

export default (props) => {
  const { render, inputProps = {}, ...rest } = props;

  return (
    <Form.Item help="" {...rest}>
      {render ? render() : <Input {...inputProps} />}
    </Form.Item>
  );
};
