import { Outlet } from "react-router-dom";
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;
import { FaReact } from "react-icons/fa";
const LayoutUser = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='layout'>
      <Header>
        <div
          className='logo'
          style={{
            float: "left",
            width: "120px",
            height: "31px",
            margin: "16px 24px 16px 0",
          }}
        >
          <FaReact></FaReact>
        </div>
        <Menu theme='dark' mode='horizontal'>
          <Menu.Item>Webdevstudios</Menu.Item>
          <Menu.Item>Webdevstudios 2</Menu.Item>
          <Menu.Item>Webdevstudios 3</Menu.Item>
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
