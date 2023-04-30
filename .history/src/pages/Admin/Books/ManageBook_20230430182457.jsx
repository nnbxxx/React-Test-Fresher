import { Col, Row, Space } from "antd";
import React from "react";
export const ManageBook = () => {
  return (
    <Space direction='vertical'>
      <>
        <Row justify={"space-around"}>
          <Col span={8}>1</Col>
          <Col span={8}>2</Col>
          <Col span={8}>3</Col>
        </Row>
      </>
      <Space>Table Book</Space>
    </Space>
  );
};
