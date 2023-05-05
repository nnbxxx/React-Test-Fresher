import React from "react";
import { Row, Skeleton, Col } from "antd";

const BookLoad = () => {
  return (
    <Row gutter={[20, 20]}>
      <Col span={16}>
        <Skeleton.Input
          style={{ width: 540, height: 235 }}
          active
        ></Skeleton.Input>
      </Col>
    </Row>
  );
};

export default BookLoad;
