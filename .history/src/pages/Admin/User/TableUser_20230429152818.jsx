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
let data = [];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const fetchListUser = async () => {
    const query = "current=1&pageSize=2";
    const res = await callGetUserWithPaginate(query);
    if (res && res.data) {
    }
    console.log("🚀 ~ file: TableUser.jsx:68 ~ fetchListUser ~ res:", res);
  };
  useEffect(() => {
    fetchListUser();
  }, []);
  return (
    <Table
      style={{ width: "100%" }}
      columns={columns}
      dataSource={listUser}
      onChange={onChange}
      pagination={{
        defaultPageSize: pageSize,
        showSizeChanger: true,
        defaultCurrent: currentPage,
        pageSizeOptions: ["2", "10", "20", "30", "50", "100"],
      }}
    />
  );
};
