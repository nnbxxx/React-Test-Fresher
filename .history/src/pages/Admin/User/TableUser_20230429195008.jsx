import React, { useEffect, useState } from "react";
import { Card, Space, Button, Input, Table } from "antd";
import { callGetUserWithPaginate } from "../../../service/api";
import {
  EditTwoTone,
  DeleteTwoTone,
  ExportOutlined,
  UserAddOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { AiOutlineReload } from "react-icons/ai";
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

  useEffect(() => {
    fetchListUser();
  }, [currentPage, pageSize]);
  const fetchListUser = async () => {
    const query = `current=${currentPage}&pageSize=${pageSize}`;
    const res = await callGetUserWithPaginate(query);
    if (res && res.data) {
      let cloneListUser = [...res.data.result].map((item) => {
        return { ...item, key: item._id };
      });
      setListUser(cloneListUser);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      if (toltalPage === 0) setToltalPage(res.data.meta.pages);
    }
  };
  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };
  return (
    <>
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
          <Button icon={<AiOutlineReload />}></Button>
        </Space>
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={listUser}
          scroll={{
            y: 300,
          }}
          onChange={onChange}
          loading={isLoading}
          pagination={{
            total: toltalPage,
            showSizeChanger: true,
            defaultCurrent: currentPage,
            defaultPageSize: pageSize,
            pageSizeOptions: ["2", "10", "20", "30", "50", "100"],
            responsive: true,
          }}
        />
      </Card>
    </>
  );
};
