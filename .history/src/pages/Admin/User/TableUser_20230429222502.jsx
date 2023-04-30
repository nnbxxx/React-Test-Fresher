import React, { useEffect, useState } from "react";
import { Card, Space, Button, Table, Col } from "antd";
import { callGetUserWithPaginate } from "../../../service/api";
import {
  EditTwoTone,
  DeleteTwoTone,
  ExportOutlined,
  UserAddOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { AiOutlineReload } from "react-icons/ai";
import SearchUser from "./SearchUser";
const columns = [
  {
    title: "Id",
    dataIndex: "_id",
  },
  {
    title: "Name",
    dataIndex: "fullName",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: true,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    sorter: true,
  },
  {
    title: "Action",
    render: (text, record, index) => {
      return (
        <Space
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            fontSize: "20px",
          }}
        >
          <EditTwoTone />
          <DeleteTwoTone twoToneColor='#dc3545' style={{ color: "red" }} />
        </Space>
      );
    },
  },
];

export const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [toltalPage, setToltalPage] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  useEffect(() => {
    fetchListUser();
  }, [currentPage, pageSize, sort, search]);
  const fetchListUser = async (search) => {
    //current=1&pageSize=2
    let query = `current=${currentPage}&pageSize=${pageSize}`;
    if (search) query += search;
    if (sort) query += sort;
    setIsLoading(true);
    const res = await callGetUserWithPaginate(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setToltalPage(res.data.meta.total);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("🚀 ~ file: TableUser.jsx:80 ~ onChange ~ sorter:", sorter);
    let sortQuery = "";
    if (sorter && sorter.order) {
      if (sorter.order === "descend") {
        sortQuery += "-";
      }
    }
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };
  const handleReaload = () => {
    setSearch("");
    setSort("");
    fetchListUser();
  };
  return (
    <>
      <Col span={24}>
        <SearchUser search={search} setSearch={setSearch} />
      </Col>
      <Card>
        <Space align='center' style={{ marginBottom: "20px", float: "right" }}>
          <Button type='primary' icon={<ExportOutlined />}>
            Export
          </Button>
          <Button type='primary' icon={<ImportOutlined />}>
            Import
          </Button>
          <Button type='primary' icon={<UserAddOutlined />}>
            Add new
          </Button>
          <Button icon={<AiOutlineReload />} onClick={handleReaload}></Button>
        </Space>
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={listUser}
          scroll={{
            y: 300,
          }}
          rowKey='_id'
          onChange={onChange}
          loading={isLoading}
          pagination={{
            total: toltalPage,
            showSizeChanger: true,
            current: currentPage,
            pageSize: pageSize,
            pageSizeOptions: ["2", "10", "20", "30", "50"],
            responsive: true,
          }}
        />
      </Card>
    </>
  );
};
