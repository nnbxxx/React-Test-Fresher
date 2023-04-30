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

export const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [toltalPage, setToltalPage] = useState(0);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("🚀 ~ file: TableUser.jsx:35 ~ onChange ~ extra:", extra);
    console.log("🚀 ~ file: TableUser.jsx:35 ~ onChange ~ sorter:", sorter);
    console.log("🚀 ~ file: TableUser.jsx:35 ~ onChange ~ filters:", filters);
    console.log(
      "🚀 ~ file: TableUser.jsx:35 ~ onChange ~ pagination:",
      pagination
    );
    if (pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };
  const fetchListUser = async () => {
    const query = `current=${currentPage}&pageSize=${pageSize}`;
    const res = await callGetUserWithPaginate(query);
    console.log("🚀 ~ file: TableUser.jsx:53 ~ fetchListUser ~ query:", query);
    if (res && res.data) {
      setListUser(res.data.result);
      setToltalPage(res.data.meta.pages);
      console.log(
        "🚀 ~ file: TableUser.jsx:43 ~ fetchListUser ~ res.data.result:",
        res.data
      );
      console.log(
        "🚀 ~ file: TableUser.jsx:34 ~ TableUser ~ toltalPage:",
        toltalPage
      );
      console.log(
        "🚀 ~ file: TableUser.jsx:57 ~ fetchListUser ~ res.data.meta.pages:",
        res.data.meta.pages
      );
    }
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
        total: 15,
        showSizeChanger: true,
        defaultCurrent: currentPage,
        defaultPageSize: pageSize,
        pageSizeOptions: ["1", "2", "10", "20", "30", "50", "100"],
        responsive: true,
      }}
    />
  );
};
