import React from "react";
import { Card, Space, Button, Input, Table } from "antd";
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
data = data.concat(data);
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export const TableUser = () => {
  return (
    <Table
      style={{ width: "100%" }}
      columns={columns}
      dataSource={data}
      onChange={onChange}
    />
  );
};
