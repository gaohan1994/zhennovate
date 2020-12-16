/**
 * program card
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 14:32:16
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-15 14:28:18
 */
import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
// import { CaretRightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Player } from 'video-react';
import './index.less';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import imgplay from '@/assets/SVG/Icon_Play_24x24.svg';
import { useFormatProgramData } from '../../detail/constants';

const prefix = 'program-component';

export default (props) => {
  const { data, id, isSticky } = props;
  const history = useHistory();
  // 视频modal显示
  const [visible, setVisible] = useState(false);

  const { checkSign } = useSignSdk();

  const { durationString, durationDaysString } = useFormatProgramData(data);

  const startProgram = () => {
    history.push(`/program/detail/${id}`);
  };

  return (
    <Card
      cover={
        isSticky ? (
          <div />
        ) : (
          <div
            className={`${prefix}-card-cover`}
            style={{ backgroundImage: `url(${data.Cover})` }}
          >
            {data.VideoUrl && (
              <div
                className={`${prefix}-card-cover-play`}
                onClick={() => setVisible(true)}
              >
                <div style={{ backgroundImage: `url(${imgplay})` }} />
                {/* <CaretRightOutlined style={{ fontSize: 33, color: 'black' }} /> */}
              </div>
            )}
          </div>
        )
      }
    >
      <div>
        <div className={`${prefix}-card-title`}>{data.Name}</div>
        <div className={`${prefix}-card-desc`}>
          <span>Total Time</span>
          <span>{durationString} to complete</span>
        </div>
        <div className={`${prefix}-card-desc`}>
          <span>Duration</span>
          <span>{durationDaysString}</span>
        </div>
        <Button
          type="primary"
          style={{ width: '100%', marginTop: 24 }}
          onClick={() => checkSign(startProgram)}
        >
          Start Program
        </Button>
      </div>
      <Modal
        title={data.Name}
        footer={null}
        onCancel={() => setVisible(false)}
        visible={visible}
        width={860}
        centered
      >
        <Player src={data.VideoUrl} />
      </Modal>
    </Card>
  );
};
