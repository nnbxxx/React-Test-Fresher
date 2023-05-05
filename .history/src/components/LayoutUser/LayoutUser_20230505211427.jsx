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
  Popover,
  Image,
} from "antd";
const { Header, Content, Footer } = Layout;
import {
  ShoppingCartOutlined,
  HomeOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { FaBars, FaReact } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineManageAccounts } from "react-icons/md";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";

import { callGetBooksCategory, callLogoutAccount } from "../../service/api";
import { doLogoutAction } from "../../redux/account/accountSlice";

import Sider from "antd/es/layout/Sider";
const baseURL = import.meta.env.VITE_BACK_END_URL;
const nonAccentVietnamese = (str) => {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};
const convertSlug = (str) => {
  str = nonAccentVietnamese(str);
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();
  // remove accents, swap ñ for n, etc
  const from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
  const to =
    "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
  return str;
};

const LayoutUser = (props) => {
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
  if (user.role !== "USER") {
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
  const carts = useSelector((state) => state.order.carts);
  const contentPopover = (
    <>
      <div className='list-books'>
        {carts &&
          carts?.length > 0 &&
          carts?.map((item) => {
            return (
              <>
                <div
                  className='book'
                  key={item._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDirectDetailBook(item.detail);
                  }}
                >
                  <Image
                    preview={false}
                    className='book-image'
                    src={`${baseURL}/images/book/${item.detail.thumbnail}`}
                    width={60}
                    height={60}
                  ></Image>
                  <div className='book-name'>{item.detail.mainText}</div>
                  <div className='book-price'>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.detail.price)}
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <Button type='primary' className='button-see-cart'>
        See Cart
      </Button>
    </>
  );
  const handleDirectDetailBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };
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
              <Popover
                content={contentPopover}
                title='Newly added product'
                rootClassName='popover-cart'
                placement='bottomRight'
              >
                <div className='cart-icon'>
                  <Badge
                    count={carts?.length > 0 ? carts?.length : 0}
                    offset={[-2, 5]}
                    showZero
                  >
                    <ShoppingCartOutlined />
                  </Badge>
                </div>
              </Popover>
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
