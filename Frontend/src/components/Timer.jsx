import React from 'react';
import { Col, Row, Statistic } from 'antd';
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const onFinish = () => {
  console.log('finished!');
};

const Timer = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Countdown value={deadline} onFinish={onFinish} />
    </Col>
  </Row>
);
export default Timer;