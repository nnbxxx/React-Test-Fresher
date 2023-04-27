import { Outlet } from "react-router-dom";
import React from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  Dropdown,
  message,
  Badge,
} from "antd";
const { Header, Content, Footer } = Layout;
import { FaReact } from "react-icons/fa";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./index.scss";
const LayoutUser = () => {
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
  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  const items = [
    {
      label: "1st menu item",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "3rd menu item",
      key: "3",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: "4rd menu item",
      key: "4",
      icon: <UserOutlined />,
      // danger: true,
      // disabled: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo'>
          <FaReact />
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
          <div className='account'>
            <Dropdown.Button
              menu={menuProps}
              placement='bottom'
              onClick={handleButtonClick}
              icon={<UserOutlined />}
            >
              UserName
            </Dropdown.Button>
          </div>
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
  );
};

export default LayoutUser;
