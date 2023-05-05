import React from "react";
import { Row, Skeleton, Col } from "antd";

const BookLoad = () => {
  return (
    <Row gutter={[0, 0]}>
      <Col span={12}>
        <Skeleton.Input
          style={{ width: 90p, height: 235 }}
          active
        ></Skeleton.Input>
      </Col>
      <Col span={12}>
        {" "}
        <Skeleton active></Skeleton>
      </Col>
    </Row>
  );
};

export default BookLoad;
