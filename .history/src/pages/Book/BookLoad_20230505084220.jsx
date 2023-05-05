import React from "react";
import { Row, Skeleton, Col } from "antd";

const BookLoad = () => {
  return (
    <Row gutter={[0, 0]}>
      <Col span={12}>
        <Skeleton.Image
          style={{ width: 600, height: 335 }}
          active
        ></Skeleton.Image>
      </Col>
      <Col span={12}>
        {" "}
        <Skeleton active></Skeleton>
        <Skeleton active></Skeleton>
      </Col>
    </Row>
  );
};

export default BookLoad;