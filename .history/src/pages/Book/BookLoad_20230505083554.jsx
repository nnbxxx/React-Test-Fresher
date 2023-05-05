import React from "react";
import { Row, Skeleton } from "antd";

const BookLoad = () => {
  return (
    <Row gutter={[20, 20]}>
      <Skeleton active></Skeleton>
    </Row>
  );
};

export default BookLoad;
