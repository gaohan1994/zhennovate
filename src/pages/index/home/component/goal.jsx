import React, { useState } from 'react';
import { Tag, Modal, Button } from 'antd';
import './index.less';
import Choice from '@/component/choice';

const prefix = 'component-home';

function Goal() {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`${prefix}-goal`}>
      <h2 style={{ marginTop: 123 }}>My Learning Goals</h2>
      <div style={{ marginTop: 18 }}>
        <Tag color="#e0e0e0">
          <span style={{ color: '#1b2631' }}>灰色</span>
        </Tag>
        <Tag color="#e0e0e0">
          <span style={{ color: '#1b2631' }}>灰色</span>
        </Tag>
        <Tag color="#e0e0e0">
          <span style={{ color: '#1b2631' }}>灰色</span>
        </Tag>
        <Tag color="#e0e0e0">
          <span style={{ color: '#1b2631' }}>灰色</span>
        </Tag>
      </div>
      <span style={{ marginTop: 18, textAlign: 'center' }}>
        This is a 95 character limit sentence. This is a 95 character limit
        sentence. This is a 95 char
      </span>
      <span
        style={{ marginTop: 8, textAlign: 'center', color: '#1890ff' }}
        onClick={() => setVisible(true)}
      >
        edit
      </span>

      <h3 style={{ marginTop: 90 }}>Quote of the day</h3>
      <span style={{ marginTop: 18, textAlign: 'center', fontStyle: 'italic' }}>
        “Inspiration quote will be written here. Inspiration quote will be
        written here. Inspiration quote will be written here.”
      </span>
      <span>— Author Name</span>

      <Modal
        width={440}
        centered
        title="Edit Weekly Action Goal"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={<Button type="primary">Save</Button>}
      >
        <div>
          <span>
            By setting a weekly goal, this helps to be a motivator for you to
            learn more and achieve success.
          </span>

          <Choice
            defaultValue="3"
            onChoice={(value) => {
              console.log('value', value);
            }}
            options={[
              {
                label: 'Casual Learner',
                subTitle: '2 Actions per week',
                value: '1',
              },
              {
                label: 'Casual Learner',
                subTitle: '2 Actions per week',
                value: '2',
              },
              {
                label: 'Casual Learner',
                subTitle: '2 Actions per week',
                value: '3',
              },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Goal;

export { Goal };
