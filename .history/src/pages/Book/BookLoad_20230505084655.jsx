import React from "react";
import { Row, Skeleton, Col } from "antd";

const BookLoad = () => {
  return (
    <Row gutter={[20, 20]}>
      <Col span={12}>
        <Skeleton.Image
          style={{ width: 600, height: 335 }}
          active
        ></Skeleton.Image>
      </Col>
      <Col span={12} style={{ marginLeft: "-60px" }}>
        {" "}
        <Skeleton active></Skeleton>
        <Skeleton active></Skeleton>
        <Skeleton.Input active style={{ width: 200 }}></Skeleton.Input>
      </Col>
      <Col
        span={12}
        style={{ display: "flex", gap: "20px", alignItems: "center" }}
      >
        <Skeleton.Image active />
        <Skeleton.Image active />
        <Skeleton.Image active />
      </Col>
    </Row>
  );
};

export default BookLoad;
