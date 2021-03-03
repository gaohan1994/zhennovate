import React from 'react';
import '../../index.less';
import { Card, Form, Input, Row, Col } from 'antd';

const prefix = 'setting';

function InfomationPassword() {
  const [form] = Form.useForm();
  return (
    <Card title="Change password" className={`${prefix}-card`}>
      <Form form={form} layout="vertical">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item label="Current password">
              <Input placeholder="Enter current password" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item label="New password">
              <Input placeholder="Enter new password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Confirm password">
              <Input placeholder="Confirm password" />
            </Form.Item>
          </Col>
        </Row>

        <h3 className={`${prefix}-card-save`} common-touch="touch">
          Save
        </h3>
      </Form>
    </Card>
  );
}

export default InfomationPassword;
