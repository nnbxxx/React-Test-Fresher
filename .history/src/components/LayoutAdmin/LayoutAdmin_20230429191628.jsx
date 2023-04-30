import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Dropdown,
  message,
} from "antd";
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
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { GiBookshelf } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import { callLogoutAccount } from "../../service/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const itemsSideBar = [
  getItem("DashBoard", "1", <PieChartOutlined />),
  getItem("Users", "sub1", <UserOutlined />, [
    getItem("CRUD", "2", <AiOutlineUsergroupAdd />),
  ]),
  getItem("Manage Books", "sub2", <GiBookshelf />, [
    // getItem("Team 1", "6"),
    // getItem("Team 2", "8"),
  ]),
  getItem("Manage Orders", "9", <TbReportMoney />, []),
];
const LayoutAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const isPermmited = isAdminRoute && user.role === "ADMIN";
  const [collapsed, setCollapsed] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === "2") {
      handleLogout();
    }
  };
  const handleSideBarClick = (e) => {
    if (e.key === "2") {
      navigate("/admin/user");
    }
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
  const handleLogout = async () => {
    const res = await callLogoutAccount();
    if (res && res.data) {
      message.success("Logout Successful");
      navigate("/");
      dispatch(doLogoutAction());
    }
  };
  return (
    <>
      {isPermmited ? (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div
              style={{
                height: 32,
                margin: 16,
                cursor: "pointer",
                position:"fixed",
    width:"100%",
    left:"0",
    top:"0",
    right: "0",
    z-index: "1000",
              }}
              className='logo-admin'
              onClick={() => {
                navigate("/admin");
              }}
            >
              {" "}
              <RiAdminLine />
            </div>
            <Menu
              theme='dark'
              mode='inline'
              defaultSelectedKeys={["1"]}
              items={itemsSideBar}
              onClick={handleSideBarClick}
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
