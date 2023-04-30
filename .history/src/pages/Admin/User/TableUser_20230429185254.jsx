import React, { useEffect, useState } from "react";
import { Card, Space, Button, Input, Table } from "antd";
import { callGetUserWithPaginate } from "../../../service/api";
import { EditOutlined } from "@ant-design/icons";
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
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <EditOutlined />
          <EditOutlined />{" "}
        </Space>
      );
    },
  },
];

export const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [toltalPage, setToltalPage] = useState(0);

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
    <Table
      style={{ width: "100%" }}
      columns={columns}
      dataSource={listUser}
      scroll={{
        y: 300,
      }}
      onChange={onChange}
      pagination={{
        total: toltalPage,
        showSizeChanger: true,
        defaultCurrent: currentPage,
        defaultPageSize: pageSize,
        pageSizeOptions: ["1", "2", "10", "20", "30", "50", "100"],
        responsive: true,
      }}
    />
  );
};
