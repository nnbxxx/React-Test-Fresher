import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Layout,
  theme,
  Button,
  Divider,
  Checkbox,
  Col,
  Row,
  Form,
  InputNumber,
  Rate,
} from "antd";
const { Header, Content, Footer } = Layout;
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import "./index.scss";
import { callGetBooksCategory, callLogoutAccount } from "../../service/api";
import Sider from "antd/es/layout/Sider";
import HeaderUser from "../Header/HeaderUser.jsx";
const LayoutUser = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [form] = Form.useForm();
  const [filter, setFilter] = useState("");
  const handleChangeFilter = (changedValues, values) => {
    if (changedValues.category && changedValues.category.length > 0) {
      let query = "&category=";
      changedValues.category.forEach((item) => {
        query += item + ",";
      });
      setFilter(query);
    } else {
      setFilter("");
    }
  };
  const onFinish = (values) => {
    if (values.category && values.category.length > 0) {
      let query = "&category=";
      values.category.forEach((item) => {
        query += item + ",";
      });
      setFilter(query);
    } else {
      setFilter("");
    }
    if (
      values.range &&
      values.range?.from > 0 &&
      values.range?.to > values.range?.from
    ) {
      //price
      let query = `&price>=${values.range?.from}&price<=${values.range?.to}`;
      setFilter(query);
    }
  };

  const [listCategory, setListCategory] = useState([]);
  const fetchListCategory = async () => {
    const res = await callGetBooksCategory();
    if (res && res.data) {
      setListCategory(res.data);
    }
  };
  useEffect(() => {
    fetchListCategory();
  }, []);
  return (
    <>
      <Layout className='layout'>
        <HeaderUser />
        <Layout>
          <Sider
            width={240}
            style={{
              background: colorBgContainer,
              marginTop: "20px",
              overflow: "auto",
              height: "107vh",
              position: "static",
              marginLeft: "10px",
              padding: "0 15px 0 10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div>
                {" "}
                <FilterOutlined
                  style={{ color: "#1677ff", marginRight: "10px" }}
                />
                Search & Filter
              </div>
              <div
                onClick={() => {
                  form.resetFields();
                  setFilter("");
                }}
                style={{ cursor: "pointer" }}
              >
                <ReloadOutlined />
              </div>
            </div>
            <Form
              onFinish={onFinish}
              form={form}
              onValuesChange={(changedValues, values) =>
                handleChangeFilter(changedValues, values)
              }
            >
              <Form.Item
                name='category'
                label='Product Category'
                labelCol={{ span: 24 }}
              >
                <Checkbox.Group>
                  <Row gutter={[0, 20]}>
                    {listCategory &&
                      listCategory.map((item) => {
                        return (
                          <Col span={24} key={item}>
                            <Checkbox value={item}>{item}</Checkbox>
                          </Col>
                        );
                      })}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Divider />
              <Form.Item label='Price Range' labelCol={{ span: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Item name={["range", "from"]}>
                    <InputNumber
                      name='from'
                      min={0}
                      placeholder='đ From'
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <span> - </span>
                  <Form.Item name={["range", "to"]}>
                    <InputNumber
                      name='to'
                      min={0}
                      placeholder='đ To'
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </div>
                <div>
                  <Button
                    onClick={() => form.submit()}
                    style={{ width: "100%" }}
                    type='primary'
                  >
                    Apply
                  </Button>
                </div>
              </Form.Item>
              <Divider />
              <Form.Item label='Evaluate' labelCol={{ span: 24 }}>
                <div>
                  <Rate
                    value={5}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className='ant-rate-text'></span>
                </div>
                <div>
                  <Rate
                    value={4}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className='ant-rate-text'>More</span>
                </div>
                <div>
                  <Rate
                    value={3}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className='ant-rate-text'>More</span>
                </div>
                <div>
                  <Rate
                    value={2}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className='ant-rate-text'>More</span>
                </div>
                <div>
                  <Rate
                    value={1}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className='ant-rate-text'>More</span>
                </div>
              </Form.Item>
              <Divider />
            </Form>
          </Sider>
          <Content
            style={{
              padding: "0 50px",
              overflow: "initial",
              marginTop: "20px",
            }}
          >
            <div
              className='site-layout-content'
              style={{
                background: colorBgContainer,
              }}
            >
              <div style={{ minHeight: "100vh" }}>
                <Outlet context={[filter, setFilter]} />
              </div>
            </div>
          </Content>
        </Layout>
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

export default LayoutUser;
