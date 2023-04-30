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

  useEffect(() => {
    fetchListUser();
  }, [currentPage, pageSize]);

  const fetchListUser = async () => {
    const query = `current=${currentPage}&pageSize=${pageSize}`;
    const res = await callGetUserWithPaginate(query);
    console.log("🚀 ~ file: TableUser.jsx:42 ~ fetchListUser ~ res:", res);
    console.log("🚀 ~ file: TableUser.jsx:42 ~ fetchListUser ~ query:", query);
    if (res && res.data) {
      setListUser(res.data.result);
      setToltalPage(res.data.meta.pages);
    }
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("🚀 ~ file: TableUser.jsx:35 ~ onChange ~ extra:", extra);
    console.log("🚀 ~ file: TableUser.jsx:35 ~ onChange ~ sorter:", sorter);
    console.log("🚀 ~ file: TableUser.jsx:35 ~ onChange ~ filters:", filters);
    console.log(
      "🚀 ~ file: TableUser.jsx:35 ~ onChange ~ pagination:",
      pagination
    );
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
