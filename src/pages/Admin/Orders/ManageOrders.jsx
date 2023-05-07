import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import {
  callGetBooksWithPaginate,
  callGetOrdersWithPaginate,
} from "../../../service/api";
import moment from "moment/moment";
import { DetailOrder } from "./OrdersDetail";
export const ManageOrders = () => {
  const [query, setQuery] = useState("");
  const [listOrder, setlistOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [toltalPage, setToltalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("&sort=-updatedAt");
  const [dataOrder, setDataOrder] = useState({});

  const [isShowModalDetailOrder, setIsShowModalDetailOrder] = useState(false);
  const columnsTable = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <>
            <a
              onClick={() => {
                setDataOrder(record);
                setIsShowModalDetailOrder(true);
              }}
            >
              {record._id}
            </a>
          </>
        );
      },
    },
    {
      title: "Name",
      className: "name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Address",
      className: "address",
      dataIndex: "address",
      sorter: true,
    },
    {
      title: "Phone",
      className: "phone",
      dataIndex: "phone",
      sorter: true,
    },

    {
      title: "Total Price",
      dataIndex: "totalPrice",
      sorter: true,
      render: (text, record, index) => {
        return (
          <>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(record.totalPrice)}
          </>
        );
      },
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      sorter: true,
      render: (text, record, index) => {
        return <>{moment(record.createdAt).format("HH:mm:ss DD-MM-YYYY")}</>;
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    let sortQuery = "";
    if (sorter && sorter.order) {
      sortQuery += "&sort=";
      if (sorter.order === "descend") {
        sortQuery += "-";
      }
      sortQuery += sorter.field;
    }
    setSort(sortQuery);
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };

  const fetchListOrder = async () => {
    let query = `current=${currentPage}&pageSize=${pageSize}`;
    if (search) query += search;
    if (sort) query += sort;
    setIsLoading(true);
    const res = await callGetOrdersWithPaginate(query);
    if (res && res.data) {
      setlistOrder(res.data.result);
      setToltalPage(res.data.meta.total);
      setTimeout(() => {
        setIsLoading(false);
      }, 10);
    }
  };
  const handleReaload = () => {
    setSearch("");
    setSort("&sort=-updatedAt");
    fetchListOrder();
  };
  useEffect(() => {
    fetchListOrder();
  }, [currentPage, pageSize, search, sort]);
  const renderHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <>Table List Order</>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button icon={<AiOutlineReload />} onClick={handleReaload}></Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Table
        style={{ width: "100%" }}
        scroll={{
          y: 300,
        }}
        columns={columnsTable}
        rowKey='_id'
        dataSource={listOrder}
        bordered
        title={renderHeader}
        onChange={onChange}
        loading={isLoading}
        pagination={{
          total: toltalPage,
          showSizeChanger: true,
          current: currentPage,
          pageSize: pageSize,
          pageSizeOptions: ["2", "10", "20"],
          responsive: true,
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} of ${total} items`;
          },
        }}
      />
      <DetailOrder
        open={isShowModalDetailOrder}
        setOpen={setIsShowModalDetailOrder}
        data={dataOrder}
        fetchListOrder={fetchListOrder}
      ></DetailOrder>
    </>
  );
};
