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
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Cash Assets",
    className: "column-money",
    dataIndex: "money",
    align: "right",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    money: "￥300,000.00",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    money: "￥1,256,000.00",
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    money: "￥120,000.00",
    address: "Sydney No. 1 Lake Park",
  },
];
export const ManageBook = () => {
  const renderHeader = () => {
    return (
      <>
        <Space align='center' style={{ marginBottom: "20px", float: "right" }}>
          <>Table List Book</>
          <Button
            type='primary'
            icon={<ExportOutlined />}
            // onClick={handleExportData}
          >
            Export
          </Button>
          <Button
            type='primary'
            icon={<ImportOutlined />}
            onClick={() => {
              // setIsOpenImportListUser(true);
            }}
          >
            Import
          </Button>
          <Button
            type='primary'
            icon={<UserAddOutlined />}
            onClick={() => {
              // setIsOpenAddModalUser(true);
            }}
          >
            Add new
          </Button>
          <Button
            icon={<AiOutlineReload />}
            // onClick={handleReaload}
          ></Button>
        </Space>
      </>
    );
  };
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
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => renderHeader}
      />
    </>
  );
};
