import { Outlet } from "react-router-dom";
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;
const LayoutUser = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className='layout-app'>
      <div>Header</div>
      <Outlet />
      <div> footer</div>
    </div>
  );
};

export default LayoutUser;
