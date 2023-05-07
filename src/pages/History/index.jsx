import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Layout, theme, Divider, Tag, Table, Space } from "antd";
const { Header, Content, Footer } = Layout;
import "./index.scss";
import HeaderUser from "../../components/Header/HeaderUser.jsx";
import { callGetOrderHistory } from "../../service/api";
import { useSelector } from "react-redux";
import ReactJson from "react-json-view";
import moment from "moment/moment";

const baseURL = import.meta.env.VITE_BACK_END_URL;
const HistoryPage = (props) => {
  const user = useSelector((state) => state.account.user);
  const [loading, setLoading] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record, index) => {
        return <>{moment(record.createdAt).format("HH:mm:ss DD-MM-YYYY")}</>;
      },
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Status",
      render: () => <Tag color='green'> Success </Tag>,
    },
    {
      title: "Detail",
      key: "detail",
      dataIndex: "detail",
      render: (text, record, index) => {
        return (
          <>
            <ReactJson
              src={record.detail}
              name={`Invoice details `}
              collapsed={true}
              enableClipboard={false}
              displayDataTypes={false}
              displayObjectSize={false}
            />
          </>
        );
      },
    },
  ];
  const [dataTable, setDataTable] = useState(null);
  const fetchDataHistory = async () => {
    const res = await callGetOrderHistory();
    if (res && res.data) {
      let preData = [];
      res.data.forEach((item, index) => {
        preData.push({
          index: index + 1,
          createdAt: item.createdAt,
          totalPrice: item.totalPrice,
          detail: item.detail,
        });
      });

      setDataTable(preData);
    }
  };
  useEffect(() => {
    fetchDataHistory();
  }, []);
  return (
    <>
      <Layout className='layout'>
        <HeaderUser></HeaderUser>
        <Content
          style={{
            padding: "0 50px",
            overflow: "initial",
            marginTop: "20px",
          }}
        >
          <Table
            columns={columns}
            dataSource={dataTable}
            pagination={false}
            loading={loading}
          />
        </Content>
        <Divider></Divider>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};
export default HistoryPage;
