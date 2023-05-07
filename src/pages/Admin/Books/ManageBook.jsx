import {
  Button,
  Card,
  Col,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  message,
  notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  EditTwoTone,
  DeleteTwoTone,
  SearchOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { AiOutlineReload } from "react-icons/ai";
import {
  callDeleteBook,
  callFetchAccount,
  callGetBooksWithPaginate,
} from "../../../service/api";
import moment from "moment/moment";
import { DetailBook } from "./BookDetail";
import ModalAddBook from "./ModalAddBook";
import ModalEditBook from "./ModalEditBook";
import * as XLSX from "xlsx";

export const ManageBook = () => {
  const [query, setQuery] = useState("sort=-updatedAt");
  const [listBook, setlistBook] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [toltalPage, setToltalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("&sort=-updatedAt");

  const [dataBook, setDataBook] = useState({});
  const [isOpenBookDetail, setIsOpenBookDetail] = useState(false);
  const [isOpenModalAddBook, setIsOpenModalAddBook] = useState(false);
  const [isOpenModalEditBook, setIsOpenModalEditBook] = useState(false);
  const columnsTable = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <>
            <a
              onClick={() => {
                setIsOpenBookDetail(true);
                setDataBook(record);
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
      className: "mainText",
      dataIndex: "mainText",
      sorter: true,
    },
    {
      title: "Category",
      className: "category",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Author",
      className: "author",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
      render: (text, record, index) => {
        return <>{record.price}đ̲</>;
      },
    },
    {
      title: "Update At",
      dataIndex: "updatedAt",
      sorter: true,
      render: (text, record, index) => {
        return <>{moment(record.updateAt).format("HH:mm:ss DD-MM-YYYY")}</>;
      },
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
            <EditTwoTone
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setIsOpenModalEditBook(true);
                setDataBook(record);
              }}
            />
            <Popconfirm
              title='Delete the User'
              description='Are you sure to delete this user?'
              onConfirm={() => {
                handleDeleteBook(record._id);
              }}
              onCancel={() => {}}
              okText='Yes'
              cancelText='No'
              placement='bottomLeft'
            >
              <DeleteTwoTone
                twoToneColor='#dc3545'
                style={{ cursor: "pointer" }}
              />
            </Popconfirm>
          </Space>
        );
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

  const fetchListBook = async () => {
    let query = `current=${currentPage}&pageSize=${pageSize}`;
    if (search) query += search;
    if (sort) query += sort;
    setIsLoading(true);
    const res = await callGetBooksWithPaginate(query);
    if (res && res.data) {
      setlistBook(res.data.result);
      setToltalPage(res.data.meta.total);
      setTimeout(() => {
        setIsLoading(false);
      }, 10);
    }
  };
  const handleReaload = () => {
    setSearch("");
    setSort("&sort=-updatedAt");
    fetchListBook();
  };
  useEffect(() => {
    fetchListBook();
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
        <>Table List Book</>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type='primary'
            icon={<ExportOutlined />}
            onClick={handleExportData}
          >
            Export
          </Button>

          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setIsOpenModalAddBook(true);
            }}
          >
            Add new
          </Button>
          <Button icon={<AiOutlineReload />} onClick={handleReaload}></Button>
        </div>
      </div>
    );
  };
  const refName = useRef();
  const refAuthor = useRef();
  const refCatogory = useRef();
  const handleSearch = () => {
    let search = "";
    if (refName.current.input.value) {
      search += `&mainText=/${refName.current.input.value}/i`;
    }
    if (refAuthor.current.input.value) {
      search += `&author=/${refAuthor.current.input.value}/i`;
    }
    if (refCatogory.current.input.value) {
      search += `&category=/${refCatogory.current.input.value}/i`;
    }
    setSearch(search);
  };
  const handleExportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(listBook);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.csv");
  };
  const handleDeleteBook = async (_id) => {
    let res = await callDeleteBook(_id);
    if (res && res.data) {
      message.success("Sucessfully Delete Book");
      fetchListBook();
    } else {
      notification.error({
        message: "Error happen",
        description: res.message,
      });
    }
  };
  return (
    <>
      <Card title='Search Books'>
        <Row justify={"space-around"} gutter={[25, 10]}>
          <Col span={8}>
            <div>Name: </div>
            <Input allowClear ref={refName}></Input>
          </Col>
          <Col span={8}>
            <div>Author: </div>
            <Input allowClear ref={refAuthor}></Input>
          </Col>
          <Col span={8}>
            <div>Catogory: </div>
            <Input allowClear ref={refCatogory}></Input>
          </Col>
        </Row>
        <Button
          type='primary'
          icon={<SearchOutlined />}
          style={{ float: "right", marginLeft: "10px", marginTop: "20px" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Card>
      <Table
        style={{ width: "100%" }}
        scroll={{
          y: 300,
        }}
        columns={columnsTable}
        rowKey='_id'
        dataSource={listBook}
        bordered
        title={renderHeader}
        onChange={onChange}
        loading={isLoading}
        pagination={{
          total: toltalPage,
          showSizeChanger: true,
          current: currentPage,
          pageSize: pageSize,
          pageSizeOptions: ["2", "10", "20", "30", "50"],
          responsive: true,
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} of ${total} items`;
          },
        }}
      />
      <DetailBook
        open={isOpenBookDetail}
        setOpen={setIsOpenBookDetail}
        data={dataBook}
        fetchListBook={fetchListBook}
      ></DetailBook>
      <ModalAddBook open={isOpenModalAddBook} setOpen={setIsOpenModalAddBook} />
      <ModalEditBook
        open={isOpenModalEditBook}
        setOpen={setIsOpenModalEditBook}
        data={dataBook}
        setData={setDataBook}
        fetchListBook={fetchListBook}
      />
    </>
  );
};
