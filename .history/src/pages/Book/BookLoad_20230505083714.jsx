import React from "react";
import { Row, Skeleton } from "antd";

const BookLoad = () => {
  return (
    <Row gutter={[20, 20]}>
      <Skeleton active></Skeleton>
      <Skeleton.Input
        style={{ width: 540, height: 235 }}
        active
      ></Skeleton.Input>
    </Row>
  );
};

export default BookLoad;
