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
import { FaBook } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { GiBookshelf } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import { callLogoutAccount } from "../../service/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { AiOutlineHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineManageAccounts } from "react-icons/md";
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
    getItem("CRUD", "3", <FaBook />),
    // getItem("Team 2", "8"),
  ]),
  getItem("Manage Orders", "9", <TbReportMoney />, [
    getItem("Team 2", "8"),
    // getItem("Team 2", "8"),
  ]),
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
    if (e.key === "3") {
      navigate("/");
    }
  };
  const handleSideBarClick = (e) => {
    if (e.key === "2") {
      navigate("/admin/user");
    }
    if (e.key === "3") {
      navigate("/admin/book");
    }
  };

  const items = [
    {
      label: "Manage Account",
      key: "1",
      icon: <MdOutlineManageAccounts />,
    },
    {
      label: "Log Out",
      key: "2",
      icon: <FiLogOut />,
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
  if (user.role) {
    items.unshift({
      label: "Home Page",
      key: "3",
      icon: <AiOutlineHome />,
    });
  }
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
                  size='middle'
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
