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
// import moment from 'moment';

const prefix = 'component-paperform';

function ActionFlowCompleteCard(props) {
  const { completeStatus = true, onComplete, title } = props;

  // const currentTime = moment().format('MM, DD, YYYY.');

  const tip = completeStatus ? 'Action completed' : 'Action in-progress';

  const text = completeStatus
    ? 'Review your answers or redo the action to practice it again!'
    : 'Mark your action complete by reflecting on the experience.';

  const redoAction = () => {
    window.location.reload();
  };
  const onCompleteAction = () => {
    onComplete && onComplete();
  };
  // const onEditAction = () => {
  //   window.location.reload();
  // };

  // <p>
  //   You {completeStatus ? 'completed' : 'started'} this action on {currentTime}
  // </p>;
  return (
    <div className={`${prefix}-card`} style={{ ...props }}>
      <Card
        tip={tip}
        title={title || 'Building a Good Self Care Routine'}
        titleStyle={{ color: '#1790ff' }}
        subTitle={<p style={{ marginTop: 8 }}>{text}</p>}
      >
        {completeStatus ? (
          <div className={`${prefix}-card-buttons`}>
            <Button onClick={redoAction}>Redo action</Button>
          </div>
        ) : (
          <div className={`${prefix}-card-buttons`}>
            <Button
              onClick={onCompleteAction}
              type="primary"
              style={{ marginLeft: 12 }}
            >
              Complete action
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ActionFlowCompleteCard;

export { ActionFlowCompleteCard };
