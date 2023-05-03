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
import { useSelector, useDispatch } from "react-redux";

import { callGetBooksCategory, callLogoutAccount } from "../../service/api";
import { doLogoutAction } from "../../redux/account/accountSlice";

import Sider from "antd/es/layout/Sider";
const BookPage = (props) => {
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
  const [filter, setFilter] = useState("");
  const handleChangeFilter = (changedValues, values) => {
    // console.log(
    //   "🚀 ~ file: LayoutUser.jsx:111 ~ handleChangeFilter ~ values:",
    //   values
    // );
    // console.log(
    //   "🚀 ~ file: LayoutUser.jsx:111 ~ handleChangeFilter ~ changedValues:",
    //   changedValues
    // );
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
    // console.log("🚀 ~ file: LayoutUser.jsx:131 ~ onFinish ~ values:", values);
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
        <>
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
              <div style={{ minHeight: "100vh" }}>Book Page</div>
            </div>
          </Content>
        </>
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
export default BookPage;