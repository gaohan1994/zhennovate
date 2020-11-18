import React from 'react';
import { Button as AntButton } from 'antd';
import './index.less';
import classnames from 'classnames';

const prefix = 'custom-button';

const Button = (props) => {
  const { className, ...rest } = props;
  return (
    <AntButton {...rest} className={classnames(`${prefix}`, className)}>
      {props.children}
    </AntButton>
  );
};

export default Button;

export { Button };
