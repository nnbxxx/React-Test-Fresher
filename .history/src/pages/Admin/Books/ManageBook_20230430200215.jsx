import { Col, Row, Space } from "antd";
import React from "react";
export const ManageBook = () => {
  return (
    <>
      <Row justify={"space-around"}>
        <Col span={8}>
          <div>Name Book</div>
        </Col>
        <Col span={8}>2</Col>
        <Col span={8}>3</Col>
      </Row>
      <Space>Table Book</Space>
    </>
  );
};
