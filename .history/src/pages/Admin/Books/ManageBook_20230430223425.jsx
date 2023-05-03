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
import {
  callFetchAccount,
  callGetBooksWithPaginate,
} from "../../../service/api";
const columnsTable = [
  {
    title: "Id",
    className: "_id",
    dataIndex: "_id",
    sorter: true,
  },
  {
    title: "Name",
    className: "mainText",
    dataIndex: "mainText",
    sorter: true,
  },
  {
    title: "Category",
    className: "category",
    dataIndex: "category",
    sorter: true,
  },
  {
    title: "Author",
    className: "author",
    dataIndex: "author",
    sorter: true,
  },
  {
    title: "Price",
    className: "price",
    dataIndex: "price",
    sorter: true,
  },
  {
    title: "Action",
  },
];
export const ManageBook = () => {
  const fetchListBook = async () => {
    let query = "";
    const res = await callGetBooksWithPaginate(query);
    console.log("🚀 ~ file: ManageBook.jsx:55 ~ fetchListBook ~ res:", res);
  };
  const renderHeader = () => {
    useEffect(() => {
      fetchListBook();
    }, []);
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
            <div>Catogory: </div>
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
        columns={columnsTable}
        rowKey='_id'
        dataSource={[]}
        bordered
        title={renderHeader}
      />
    </>
  );
};