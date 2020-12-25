/**
 * 显示 card
 * @Author: centerm.gaohan
 * @Date: 2020-12-24 15:41:06
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-24 23:16:37
 */
import React from 'react';
import { Button } from 'antd';
import '../index.less';
import Card from '@/component/card';

const prefix = 'component-paperform';

function ActionFlowCompleteCard(props) {
  const redoAction = () => {
    window.location.reload();
  };
  return (
    <div className={`${prefix}-card`} style={{ ...props }}>
      <Card
        tip="Action Completed"
        title="Building a Good Self Care Routine"
        subTitle={
          <>
            <p>You completed this on MM, DD, YYYY.</p>
            <p style={{ marginTop: 8 }}>
              Review your answers or redo the action to practice it again!
            </p>
          </>
        }
      >
        <div className={`${prefix}-card-buttons`}>
          <Button onClick={redoAction}>Redo Action</Button>
          {/* <Button style={{ marginLeft: 12 }} type="primary">
            View Result
          </Button> */}
        </div>
      </Card>
    </div>
  );
}

export default ActionFlowCompleteCard;

export { ActionFlowCompleteCard };
