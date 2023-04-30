import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
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
} from "antd";
const { Header, Content, Footer } = Layout;
import { FaReact } from "react-icons/fa";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import { callLogoutAccount } from "../../service/api";
import { doLogoutAction } from "../../redux/account/accountSlice";

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
    // console.log("🚀 ~ file: LayoutUser.jsx:43 ~ handleLogout ~ res:", res);
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
  };
  const BreadcrumbItems = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Home</span>
        </>
      ),
    },
  ];
  const items = [
    {
      label: <span> Manage Account</span>,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Log Out",
      key: "2",
      icon: <UserOutlined />,
    },
    // {
    //   label: "3rd menu item",
    //   key: "3",
    //   icon: <UserOutlined />,
    //   danger: true,
    // },
    // {
    //   label: "4rd menu item",
    //   key: "4",
    //   icon: <UserOutlined />,
    //   danger: true,
    //   disabled: true,
    // },
  ];
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
  const urlAvatar = `${
    import.meta.env.VITE_BACK_END_URL
  }/images/avatar/image-id-here`;
  const renderAvatar = () => {
    return <Avatar shape='circle' src={urlAvatar}></Avatar>;
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
            <div className='cart-icon'>
              <Badge count={5} offset={[-2, 5]}>
                <ShoppingCartOutlined />
              </Badge>
            </div>
            {isAuthenticated === true ? (
              <div className='account'>
                <Dropdown.Button
                  menu={menuProps}
                  placement='bottom'
                  icon={renderAvatar()}
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
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            items={BreadcrumbItems}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className='site-layout-content'
            style={{
              background: colorBgContainer,
            }}
          >
            <div style={{ height: "70vh" }}>
              <Outlet />
            </div>
          </div>
        </Content>
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
