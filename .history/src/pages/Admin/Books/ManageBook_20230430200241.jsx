import { Col, Input, Row, Space } from "antd";
import React from "react";
export const ManageBook = () => {
  return (
    <>
      <Row justify={"space-around"}>
        <Col span={8}>
          <div>Name Book</div>
          <Input></Input>
        </Col>
        <Col span={8}>
          <div>Name Book</div>
          <Input></Input>
        </Col>
        <Col span={8}>
          <div>Name Book</div>
          <Input></Input>
        </Col>
      </Row>
      <Space>Table Book</Space>
    </>
  );
};
