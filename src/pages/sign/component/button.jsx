/**
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 10:22:02
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-03-05 14:47:04
 */
import React, { useRef, useEffect, useState } from 'react';
import { Button } from 'antd';
// import  from '@/component/button';

export default (props) => {
  const { form, submit } = props;
  // 获取buttondom为了设置高度
  const buttonRef = useRef(null);

  const [loading, setLoading] = useState(false);
  // message的高度
  // const [messageHeight, setMessageHeight] = useState(20);

  /**
   * 获取button的位置
   */
  useEffect(() => {
    if (buttonRef.current) {
      // setMessageHeight(buttonRef.current.offsetTop);
    }
  }, [buttonRef.current]);

  const onSubmit = async () => {
    try {
      const result = await form?.validateFields();
      setLoading(true);
      submit(result);

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.log('error', error);
      submit(error);
    }
  };

  return (
    <div ref={buttonRef} style={{ marginTop: 22 }}>
      <Button
        type="primary"
        loading={loading}
        style={{ width: '100%' }}
        onClick={onSubmit}
      >
        {props.children}
      </Button>
    </div>
  );
};
