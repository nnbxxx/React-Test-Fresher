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
import "./index.scss";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import { AiOutlineUsergroupAdd } from "react-icons/ai";
const itemsSideBar = [
  getItem("DashBoard", "1", <PieChartOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("CRUD", "3"),

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
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  const items = [
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
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {isPermmited ? (
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
              items={itemsSideBar}
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
                  icon={<UserOutlined />}
                >
                  Welcome {user.fullName}
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

            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Ant Design ©2023 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
};
export default LayoutAdmin;
