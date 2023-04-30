import React, { useEffect, useState } from "react";
import {
  Card,
  Space,
  Button,
  Table,
  Col,
  Popconfirm,
  message,
  notification,
} from "antd";
import { callDeleteUser, callGetUserWithPaginate } from "../../../service/api";
import {
  EditTwoTone,
  DeleteTwoTone,
  ExportOutlined,
  UserAddOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { AiOutlineReload } from "react-icons/ai";
import SearchUser from "./SearchUser";
import { DetailUser } from "./DetailUser";
import ModalAddUser from "./ModalAddUser";
import ModalImportFile from "./ModalImportListUser";
import * as XLSX from "xlsx";
import ModalEditUser from "./ModalEditUser";
import { moment } from "moment/moment";
export const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [toltalPage, setToltalPage] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddModalUser, setIsOpenAddModalUser] = useState(false);
  const [isOpenImportListUser, setIsOpenImportListUser] = useState(false);
  const [isOpenEditUser, setIsOpenEditUser] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <>
            <a
              onClick={() => {
                setIsOpen(true);
                setDataUser(record);
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
      title: "Update At",
      dataIndex: "updatedAt",
      sorter: true,
      render: (text, record, index) => {
        <>{moment(record.updateAt).format("HH:mm:ss DD-MM-YYYY")}</>;
        console.log(
          "🚀 ~ file: TableUser.jsx:84 ~ TableUser ~ record:",
          record
        );
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
                setIsOpenEditUser(true);
                setDataUser(record);
              }}
            />
            <Popconfirm
              title='Delete the User'
              description='Are you sure to delete this user?'
              onConfirm={() => {
                handleDeleteUser(record._id);
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
  useEffect(() => {
    fetchListUser();
  }, [currentPage, pageSize, sort, search]);
  const fetchListUser = async () => {
    //current=1&pageSize=2
    let query = `current=${currentPage}&pageSize=${pageSize}`;
    if (search) query += search;
    if (sort) query += sort;
    setIsLoading(true);
    const res = await callGetUserWithPaginate(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setToltalPage(res.data.meta.total);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };
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
  const handleReaload = () => {
    setSearch("");
    setSort("");
    fetchListUser();
  };
  const handleExportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(listUser);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.csv");
  };
  const handleDeleteUser = async (_id) => {
    let res = await callDeleteUser(_id);
    if (res && res.data) {
      message.success("Sucessfully Delete User");
      fetchListUser();
    } else {
      notification.error({
        message: "Error happen",
        description: res.message,
      });
    }
  };
  return (
    <>
      <Col span={24}>
        <SearchUser search={search} setSearch={setSearch} />
      </Col>
      <Card>
        <Space align='center' style={{ marginBottom: "20px", float: "right" }}>
          <Button
            type='primary'
            icon={<ExportOutlined />}
            onClick={handleExportData}
          >
            Export
          </Button>
          <Button
            type='primary'
            icon={<ImportOutlined />}
            onClick={() => {
              setIsOpenImportListUser(true);
            }}
          >
            Import
          </Button>
          <Button
            type='primary'
            icon={<UserAddOutlined />}
            onClick={() => {
              setIsOpenAddModalUser(true);
            }}
          >
            Add new
          </Button>
          <Button icon={<AiOutlineReload />} onClick={handleReaload}></Button>
        </Space>
        <Table
          columns={columns}
          dataSource={listUser}
          style={{ width: "100%" }}
          scroll={{
            y: 300,
          }}
          rowKey='_id'
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
      </Card>
      <DetailUser open={isOpen} setOpen={setIsOpen} data={dataUser} />
      <ModalAddUser open={isOpenAddModalUser} setOpen={setIsOpenAddModalUser} />
      <ModalImportFile
        open={isOpenImportListUser}
        setOpen={setIsOpenImportListUser}
      />
      <ModalEditUser
        open={isOpenEditUser}
        setOpen={setIsOpenEditUser}
        data={dataUser}
      />
    </>
  );
};
