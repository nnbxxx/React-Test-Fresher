import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme, Button, Dropdown } from "antd";
import {
  FileOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const isPermmited = isAdminRoute && user.role === "ADMIN";
  const [collapsed, setCollapsed] = useState(false);
  const itemsMenu = [
    {
      label: "Manage Account",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Log Out",
      key: "2",
      icon: <UserOutlined />,
    },
  ];
  const menuProps = {
    itemsMenu,
    onClick: handleMenuClick,
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleButtonMenuClick = (e) => {
    //message.info("Click on left button.");
    //console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    //message.info("Click on menu item.");
    //console.log("click", e);
  };
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className='account'>
              <Dropdown.Button
                menu={menuProps}
                placement='bottom'
                onClick={handleButtonClick}
                icon={<UserOutlined />}
              >
                {user.fullName}
              </Dropdown.Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: "80vh",
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
          {isPermmited && (
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Ant Design ©2023 Created by Ant UED
            </Footer>
          )}
        </Layout>
      </Layout>
    </>
  );
};
export default LayoutAdmin;
