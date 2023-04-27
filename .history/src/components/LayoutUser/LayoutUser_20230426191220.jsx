import { Outlet } from "react-router-dom";
import React from "react";
import { Breadcrumb, Layout, Menu, theme, Input } from "antd";
const { Header, Content, Footer } = Layout;
import { FaReact } from "react-icons/fa";
import "./index.scss";
const LayoutUser = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo'>
          <FaReact />
          <div className='detail-logo'> Webdevstudio </div>
        </div>
        <Menu theme='dark' mode='horizontal'>
          <Input.Search
            placeholder='input search text'
            // onSearch={}
            enterButton
            className='search-bar'
          />
          <Menu.Item></Menu.Item>
        </Menu>
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
