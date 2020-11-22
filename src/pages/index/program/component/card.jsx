/**
 * program card
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 14:32:16
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-22 16:23:21
 */
import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Player } from 'video-react';
import './index.less';

const prefix = 'program-component';

export default (props) => {
  const { data, id } = props;
  // 视频modal显示
  const [visible, setVisible] = useState(false);
  return (
    <Card
      cover={
        <div
          className={`${prefix}-card-cover`}
          style={{ backgroundImage: `url(${data.Cover})` }}
        >
          {data.VideoUrl && (
            <div
              className={`${prefix}-card-cover-play`}
              onClick={() => setVisible(true)}
            >
              <CaretRightOutlined style={{ fontSize: 33, color: 'black' }} />
            </div>
          )}
        </div>
      }
    >
      <div>
        <div className={`${prefix}-card-title`}>{data.Name}</div>
        <div className={`${prefix}-card-desc`}>
          <span>Total Time</span>
          <span>3 hours to complete</span>
        </div>
        <div className={`${prefix}-card-desc`}>
          <span>Duration</span>
          <span>7 days</span>
        </div>
        <Link to={`/program/detail/${id}`}>
          <Button type="primary" style={{ width: '100%', marginTop: 24 }}>
            Start Program
          </Button>
        </Link>
      </div>
      <Modal
        title={data.Name}
        footer={null}
        onCancel={() => setVisible(false)}
        visible={visible}
        width={860}
        centered
      >
        <Player>
          <srouce src="https://www.bilibili.com/video/BV1tE411h7VP" />
        </Player>
      </Modal>
    </Card>
  );
};
