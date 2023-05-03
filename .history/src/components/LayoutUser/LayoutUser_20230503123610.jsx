import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  Dropdown,
  message,
  Badge,
  Button,
  Drawer,
  Avatar,
  Divider,
  Checkbox,
  Col,
  Row,
  Form,
  InputNumber,
  Rate,
} from "antd";
const { Header, Content, Footer } = Layout;
import { FaReact } from "react-icons/fa";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { callGetBooksCategory, callLogoutAccount } from "../../service/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineManageAccounts } from "react-icons/md";
import Sider from "antd/es/layout/Sider";
const LayoutUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuItems = [
    // {
    //   key: "homePage",
    //   icon: <AiOutlineHome />,
    //   label: "Home",
    // },
  ];
  const handleLogout = async () => {
    const res = await callLogoutAccount();
    if (res && res.data) {
      message.success("Logout Successful");
      navigate("/");
      dispatch(doLogoutAction());
    }
  };
  const handleMenuClick = (e) => {
    // console.log("click", e);
    if (e.key === "2") {
      handleLogout();
    }
    if (e.key === "3") {
      navigate("/admin");
    }
  };
  const items = [
    {
      label: <span> Manage Account</span>,
      key: "1",
      icon: <MdOutlineManageAccounts />,
    },
    {
      label: "Log Out",
      key: "2",
      icon: <FiLogOut />,
      danger: true,
    },
  ];
  if (user.role) {
    items.unshift({
      label: "Admin Page",
      key: "3",
      icon: <FcManager />,
    });
  }
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const urlAvatar = `${import.meta.env.VITE_BACK_END_URL}/images/avatar/${
    user.avatar
  }`;

  const [form] = Form.useForm();
  const handleChangeFilter = (changedValues, values) => {
    console.log(">>> check handleChangeFilter", changedValues, values);
  };

  const onFinish = (values) => {};

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
  console.log(
    "🚀 ~ file: LayoutUser.jsx:116 ~ LayoutUser ~ listCategory:",
    listCategory
  );

  return (
    <>
      <Layout className='layout'>
        <Header>
          <div
            className='logo'
            onClick={() => {
              navigate("/");
            }}
          >
            <FaReact />
            Webdevstudios
          </div>
          <div className='logo-mobile' onClick={showDrawer}>
            <FaBars />
          </div>
          <div className='navbar-search'>
            <Input.Search
              placeholder='What are you looking for today?'
              // onSearch={}
              enterButton
              className='search-bar'
            />
            <div className='menu-item'>
              <Menu theme='dark' items={menuItems}></Menu>
            </div>
            {isAuthenticated === true ? (
              <div className='cart-icon'>
                <Badge count={5} offset={[-2, 5]}>
                  <ShoppingCartOutlined />
                </Badge>
              </div>
            ) : null}

            {isAuthenticated === true ? (
              <div className='account'>
                <Dropdown.Button
                  menu={menuProps}
                  size='middle'
                  placement='bottom'
                  icon={<Avatar shape='circle' src={urlAvatar}></Avatar>}
                >
                  {user.fullName}
                </Dropdown.Button>
              </div>
            ) : (
              <div
                className='account'
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </Header>
        <Layout>
          <Sider
            width={200}
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
                      listCategory.forEach((item) => {
                        console.log(
                          "🚀 ~ file: LayoutUser.jsx:244 ~ listCategory.forEach ~ item:",
                          item
                        );

                        return (
                          <>
                            <Col span={24}>
                              <Checkbox value={item}>{item}</Checkbox>
                            </Col>
                          </>
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
                <Outlet />
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
      {isAuthenticated === true && (
        <Drawer
          title='Menu Account'
          placement='left'
          onClose={onClose}
          open={open}
        >
          <p style={{ cursor: "pointer" }}>Manage Account</p>
          <p style={{ cursor: "pointer" }} onClick={handleLogout}>
            Log Out
          </p>
        </Drawer>
      )}
    </>
  );
};

export default LayoutUser;
