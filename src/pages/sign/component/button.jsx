/**
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 10:22:02
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 11:46:43
 */
import React, { useRef, useEffect, useState } from 'react';
import { Button, message } from 'antd';

export default (props) => {
  const { form, submit } = props;
  // 获取buttondom为了设置高度
  const buttonRef = useRef(null);
  // message的高度
  const [messageHeight, setMessageHeight] = useState(20);

  /**
   * 获取button的位置
   */
  useEffect(() => {
    if (buttonRef.current) {
      setMessageHeight(buttonRef.current.offsetTop);
    }
  }, [buttonRef.current]);

  const onSubmit = async () => {
    try {
      const result = await form?.validateFields();
      submit(result);
    } catch (error) {
      error.errorFields &&
        message.error({
          content: error.errorFields[0]?.errors[0],
          style: {
            width: 324 + 16,
            margin: '0 auto',
            marginTop: messageHeight + 40,
            fontSize: 14,
            fontWeight: 'normal',
          },
        });
    }
  };

  return (
    <div ref={buttonRef}>
      <Button type="primary" style={{ width: '100%' }} onClick={onSubmit}>
        sign up
      </Button>
    </div>
  );
};
