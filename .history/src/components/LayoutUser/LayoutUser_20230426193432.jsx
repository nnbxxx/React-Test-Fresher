import { Outlet } from "react-router-dom";
import React from "react";
import { Breadcrumb, Layout, Menu, theme, Input } from "antd";
const { Header, Content, Footer } = Layout;
import { FaReact } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";

import "./index.scss";
const LayoutUser = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuItems = [
    {
      key: "homePage",
      icon: <AiOutlineHome />,
      label: "Home",
    },
  ];
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo'>
          <FaReact />
        </div>
        <div className='navbar-search'>
          <Menu theme='dark' mode='horizontal' items={menuItems}></Menu>
          <Input.Search
            placeholder='What are you looking for today?'
            // onSearch={}
            enterButton
            className='search-bar'
            style={{ backgroundColor: "red" }}
          />
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
