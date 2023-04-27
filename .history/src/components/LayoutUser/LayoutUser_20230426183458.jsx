import { Outlet } from "react-router-dom";
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;
const LayoutUser = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='layout-app'>
      <Header>
        <div className='logo'>1233456</div>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={["2"]}
          items={new Array(5).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Outlet />
      <div> footer</div>
    </Layout>
  );
};

export default LayoutUser;
