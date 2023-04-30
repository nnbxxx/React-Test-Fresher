import React from "react";
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
  const fetchListUser = async () => {
    const res = await callGetUserWithPaginate(query);
  };
  return (
    <Table
      style={{ width: "100%" }}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["2", "10", "20", "30", "50", "100"],
      }}
    />
  );
};
