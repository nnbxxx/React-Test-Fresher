import React, { useEffect, useState } from "react";
import { Card, Space, Button, Input, Table } from "antd";
import { callGetUserWithPaginate } from "../../../service/api";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Chinese Score",
    dataIndex: "chinese",
    sorter: true,
  },
  {
    title: "Math Score",
    dataIndex: "math",
    sorter: true,
  },
  {
    title: "English Score",
    dataIndex: "english",
    sorter: true,
  },
];
let data = [
  {
    name: "John Brown",
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    name: "Jim Green",
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    name: "Joe Black",
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
  },
];
data = data
  .concat(data)
  .concat(data)
  .concat(data)
  .concat(data)
  .concat(data)
  .concat(data)
  .concat(data)
  .concat(data)
  .concat(data);
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export const TableUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultPageSize, setDefaultPageSize] = useState(2);
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
      dataSource={data}
      onChange={onChange}
      pagination={{
        defaultPageSize: 2,
        showSizeChanger: true,
        defaultCurrent: currentPage,
        pageSizeOptions: ["2", "10", "20", "30", "50", "100"],
      }}
    />
  );
};
