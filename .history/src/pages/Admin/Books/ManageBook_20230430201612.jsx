import { Button, Card, Col, Input, Row, Space } from "antd";
import React from "react";
export const ManageBook = () => {
  return (
    <>
      <Card title='Search Books'>
        <Row justify={"space-around"} gutter={[10, 10]}>
          <Col span={8}>
            <div>Name: </div>
            <Input></Input>
          </Col>
          <Col span={8}>
            <div>Author: </div>
            <Input></Input>
          </Col>
          <Col span={8}>
            <div>Type: </div>
            <Input></Input>
          </Col>
        </Row>
        <Button
          type='primary'
          icon={<SearchOutlined />}
          style={{ float: "right", marginLeft: "10px" }}
          onClick={handleFind}
        >
          Search
        </Button>
      </Card>
      <Space>Table Book</Space>
    </>
  );
};
