import React from "react";
import { Row, Skeleton } from "antd";

const BookLoad = () => {
  return (
    <Row gutter={[20, 20]}>
      <Skeleton>
        <Skeleton.Image style={{ width: 540, height: 235 }}></Skeleton.Image>
      </Skeleton>
    </Row>
  );
};

export default BookLoad;
