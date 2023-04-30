import { Button, Card, Col, Input, Row, Space, Table } from "antd";
import React from "react";
import {
  EditTwoTone,
  DeleteTwoTone,
  SearchOutlined,
  ClearOutlined,
  ExportOutlined,
  UserAddOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { AiOutlineReload } from "react-icons/ai";

export const ManageBook = () => {
  return (
    <>
      <Card title='Search Books'>
        <Row justify={"space-around"} gutter={[25, 10]}>
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
          style={{ float: "right", marginLeft: "10px", marginTop: "20px" }}
          // onClick={}
        >
          Search
        </Button>
        <Button
          icon={<ClearOutlined />}
          style={{ float: "right", marginLeft: "10px", marginTop: "20px" }}
          // onClick={}
        >
          Clear
        </Button>
      </Card>
      <></>
    </>
  );
};
