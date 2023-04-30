import { Card, Col, Input, Row, Space } from "antd";
import React from "react";
export const ManageBook = () => {
  return (
    <>
      <Card>
        <Row justify={"space-around"} gutter={[10, 10]}>
          <Col span={8}>
            <div>Name:</div>
            <Input></Input>
          </Col>
          <Col span={8}>
            <div>Author:</div>
            <Input></Input>
          </Col>
          <Col span={8}>
            <div>Name Book</div>
            <Input></Input>
          </Col>
        </Row>
      </Card>
      <Space>Table Book</Space>
    </>
  );
};
