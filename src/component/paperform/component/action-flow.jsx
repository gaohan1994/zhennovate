/**
 * 显示 card
 * @Author: centerm.gaohan
 * @Date: 2020-12-24 15:41:06
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-31 16:29:20
 */
import React from 'react';
import { Button } from 'antd';
import '../index.less';
import Card from '@/component/card';
import moment from 'moment';

const prefix = 'component-paperform';

function ActionFlowCompleteCard(props) {
  const { completeStatus = true, onComplete } = props;

  const currentTime = moment().format('MM, DD, YYYY.');

  const tip = completeStatus ? 'Action Completed' : 'Action Added';

  const title = 'Building a Good Self Care Routine';

  const text = completeStatus
    ? 'Review your answers or redo the action to practice it again!'
    : 'Mark your action as complete in order to finish the module';

  const redoAction = () => {
    window.location.reload();
  };
  const onCompleteAction = () => {
    onComplete && onComplete();
  };
  const onEditAction = () => {
    window.location.reload();
  };

  return (
    <div className={`${prefix}-card`} style={{ ...props }}>
      <Card
        tip={tip}
        title={title}
        subTitle={
          <>
            <p>
              You {completeStatus ? 'completed' : 'added'} this on {currentTime}
            </p>
            <p style={{ marginTop: 8 }}>{text}</p>
          </>
        }
      >
        {completeStatus ? (
          <div className={`${prefix}-card-buttons`}>
            <Button onClick={redoAction}>Redo Action</Button>
          </div>
        ) : (
          <div className={`${prefix}-card-buttons`}>
            <Button onClick={onEditAction}>Edit Action</Button>
            <Button
              onClick={onCompleteAction}
              type="primary"
              style={{ marginLeft: 12 }}
            >
              Complete Action
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ActionFlowCompleteCard;

export { ActionFlowCompleteCard };
