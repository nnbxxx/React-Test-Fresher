import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import {
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
  Popover,
  Image,
  Empty,
  Row,
  Col,
  Card,
  Divider,
  InputNumber,
  Steps,
  Form,
  Result,
} from "antd";
const { Header, Content, Footer } = Layout;
import {
  CheckCircleOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { FaBars, FaReact } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { callLogoutAccount, callPostCreateOrder } from "../../service/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import "./index.scss";
import {
  doAddBookAction,
  doDeleteBookAction,
  doUpdateBookAction,
} from "../../redux/order/orderSlice";
import TextArea from "antd/es/input/TextArea";
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

const OrderPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
  let carts = useSelector((state) => state.order.carts);
  const handleDirectDetailBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };
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
      <Button
        type='primary'
        className='button-see-cart'
        onClick={() => {
          return navigate("/order");
        }}
      >
        See Cart
      </Button>
    </>
  );
  const [total, setTotal] = useState(0);
  const handleOnChangeQuanlity = (value, book) => {
    if (!isNaN(value) || value < 1) {
      dispatch(
        doUpdateBookAction({ quanlity: value, detail: book, _id: book._id })
      );
    }
  };
  const handleDeleteBook = (book) => {
    dispatch(doDeleteBookAction({ _id: book._id }));
  };
  useEffect(() => {
    let tmpTotal = 0;
    if (carts && carts.length > 0) {
      carts.map((item) => {
        tmpTotal += item.quanlity * item.detail.price;
      });
    }
    setTotal(tmpTotal);
  }, [carts]);
  const [showListCart, setShowListCart] = useState(true);
  const [stepCurrent, setStepCurrent] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinishForm = async (values) => {
    console.log("Success:", values);
    const data = {
      name: values.username,
      address: values.address,
      phone: values.phone,
      totalPrice: total,
      detail: [],
    };
    let tmpListBook = [];
    carts.forEach((item) => {
      tmpListBook.push({bookname:"",quantity:"","_id"})
    });
    setLoading(true);
    const res = await callPostCreateOrder(data);
    if (res && res.data) {
      setShowListCart(false);
      setTimeout(() => {
        // setLoading(false);
      }, 200);
    }
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
              <Menu theme='dark' items={[]}></Menu>
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
              minHeight: "80vh",
            }}
          >
            {carts && carts.length > 0 && isAuthenticated === true ? (
              <>
                <Steps
                  size='large'
                  style={{ marginBottom: 15 }}
                  current={stepCurrent}
                  items={[
                    {
                      title: "Order",
                    },
                    {
                      title: "Place an order.",
                    },
                    {
                      title: "Payment",
                    },
                  ]}
                />
                {
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div
                      style={{
                        width: "70%",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        gap: 20,
                        margin: "10px 20px",
                      }}
                      className='listbook'
                    >
                      {carts &&
                        showListCart &&
                        carts?.length > 0 &&
                        carts?.map((item) => {
                          return (
                            <div
                              key={item._id}
                              className='book'
                              style={{
                                borderRadius: 5,
                                padding: 15,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 10,

                                background: colorBgContainer,
                              }}
                            >
                              <Image
                                preview={false}
                                width={100}
                                height={100}
                                src={`${baseURL}/images/book/${item.detail.thumbnail}`}
                              ></Image>
                              <span
                                style={{
                                  fontSize: "16px",
                                  lineHeight: 1.2,
                                  width: 250,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleDirectDetailBook(item.detail);
                                }}
                              >
                                {item.detail.mainText}
                              </span>
                              <div
                                className='price-prpduct'
                                style={{ display: "flex", gap: 10 }}
                              >
                                <label>Price:</label>
                                <div>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.detail.price)}
                                </div>
                              </div>
                              <InputNumber
                                min={1}
                                max={item.detail.quantity}
                                value={item.quanlity}
                                onChange={(value) => {
                                  handleOnChangeQuanlity(value, item.detail);
                                }}
                              ></InputNumber>
                              <div
                                className='price-product'
                                style={{ display: "flex", gap: 10 }}
                              >
                                <label>Sum: </label>
                                <div>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.quanlity * item.detail.price)}
                                </div>
                              </div>
                              <DeleteOutlined
                                style={{ cursor: "pointer", fontSize: 15 }}
                                onClick={() => {
                                  handleDeleteBook(item.detail);
                                }}
                              />
                            </div>
                          );
                        })}
                    </div>
                    {stepCurrent === 0 && (
                      <>
                        <div
                          style={{
                            background: colorBgContainer,
                            padding: 20,
                            borderRadius: "5px",
                            width: "30%",
                            maxHeight: 250,
                            padding: "10px",
                            margin: "10px 0px",
                          }}
                        >
                          <div
                            className='subtotal'
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontSize: 18,
                            }}
                          >
                            <label>Subtotal:</label>
                            <div>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(total)}
                            </div>
                          </div>
                          <Divider></Divider>
                          <div
                            className='total'
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontSize: 18,
                            }}
                          >
                            <label>Total:</label>
                            <div
                              style={{
                                color: "#ff424e",
                                fontSize: "24px",
                                fontWeight: 500,
                                lineHeight: 1.5,
                              }}
                            >
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(total)}
                            </div>
                          </div>
                          <Divider></Divider>
                          <Button
                            type='primary'
                            size='large'
                            style={{ float: "right" }}
                            onClick={() => {
                              setStepCurrent(1);
                              form.setFieldsValue({
                                username: user.fullName,
                                phone: user.phone,
                              });
                            }}
                          >
                            Purchase ({carts.length})
                          </Button>
                        </div>
                      </>
                    )}
                    {stepCurrent === 1 && (
                      <>
                        <div
                          style={{
                            background: colorBgContainer,
                            padding: 20,
                            borderRadius: "5px",
                            width: "30%",
                            minHeight: "60vh",
                            padding: "10px",
                            margin: "10px 0px",
                          }}
                        >
                          <Form
                            onFinish={onFinishForm}
                            form={form}
                            name='information-custumer'
                            layout='vertical'
                          >
                            <Form.Item
                              label={`Recipient's name`}
                              name='username'
                              required
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label='Phone Number'
                              name='phone'
                              rules={[
                                {
                                  required: true,
                                  message: "Please fill your Phone Number !",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label='Payment methods'
                              name='methods'
                              required
                            >
                              <span style={{ display: "block" }}>
                                <Badge
                                  status='processing'
                                  text={`Cash on delivery (COD) payment`}
                                />
                              </span>
                            </Form.Item>
                            <Form.Item
                              label='Address'
                              name='address'
                              rules={[
                                {
                                  required: true,
                                  message: "Please fill your address !",
                                },
                              ]}
                            >
                              <TextArea rows={2} />
                            </Form.Item>
                            <Divider></Divider>
                            <div
                              className='total'
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                fontSize: 18,
                              }}
                            >
                              <label>Total:</label>
                              <div
                                style={{
                                  color: "#ff424e",
                                  fontSize: "24px",
                                  fontWeight: 500,
                                  lineHeight: 1.5,
                                }}
                              >
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(total)}
                              </div>
                            </div>
                            <Divider></Divider>
                            <Button
                              type='primary'
                              size='large'
                              style={{ float: "right" }}
                              onClick={() => {
                                form.submit();
                                // setStepCurrent(2);
                              }}
                              loading={loading}
                            >
                              Payment ({carts.length})
                            </Button>
                          </Form>
                        </div>
                      </>
                    )}
                  </div>
                }
                {stepCurrent === 2 && (
                  <Result
                    icon={<CheckCircleOutlined />}
                    title='Your order has been placed successfully.'
                    extra={<Button type='primary'>View History</Button>}
                  />
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Empty
                  image='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png'
                  imageStyle={{
                    height: 300,
                    width: 300,
                    marginTop: 30,
                  }}
                  description={
                    <span style={{ fontSize: "20px" }}>
                      Your shopping cart is still empty.
                    </span>
                  }
                >
                  <Button
                    type='primary'
                    size='large'
                    onClick={() => {
                      return navigate("/");
                    }}
                  >
                    Buy Now
                  </Button>
                </Empty>
              </div>
            )}
          </div>
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
export default OrderPage;
