import { Button, Card, Col, Input, Row, Space, Table } from "antd";
import React, { useEffect } from "react";
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
import { callFetchAccount } from "../../../service/api";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Cash Assets",
    className: "column-money",
    dataIndex: "money",
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
  const fetchListBook = async () => {
    let query = "";
    const res = await callFetchAccount(query);
    console.log("🚀 ~ file: ManageBook.jsx:55 ~ fetchListBook ~ res:", res);
  };
  const renderHeader = () => {
    useEffect(() => {}, []);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <>Table List B</>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type='primary'
            icon={<ExportOutlined />}
            // onClick={handleExportData}
          >
            Export
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
        </div>
      </div>
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
        title={renderHeader}
      />
    </>
  );
};
