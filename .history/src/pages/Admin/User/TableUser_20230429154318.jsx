import React, { useEffect, useState } from "react";
import { Card, Space, Button, Input, Table } from "antd";
import { callGetUserWithPaginate } from "../../../service/api";
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
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [toltalPage, setToltalPage] = useState(0);
  const fetchListUser = async () => {
    const query = `current=${currentPage}&pageSize=${pageSize}`;
    const res = await callGetUserWithPaginate(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setToltalPage(res.data.meta.pages);
    }
    console.log(
      "🚀 ~ file: TableUser.jsx:43 ~ fetchListUser ~ res.data.result:",
      res.data.result
    );
  };
  useEffect(() => {
    fetchListUser();
  }, [currentPage, pageSize]);
  return (
    <Table
      style={{ width: "100%" }}
      columns={columns}
      dataSource={listUser}
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
