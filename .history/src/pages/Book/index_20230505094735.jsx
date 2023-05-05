import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import {
  Layout,
  Menu,
  theme,
  Input,
  Dropdown,
  message,
  Badge,
  Button,
  Drawer,
  Avatar,
  Rate,
  Skeleton,
  InputNumber,
} from "antd";
const { Header, Content, Footer } = Layout;
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FaBars, FaReact } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import { callGetBookDetailById, callLogoutAccount } from "../../service/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import "./index.scss";
import ImageGallery from "react-image-gallery";
import ModalViewImg from "./ModalViewImg";
import BookLoad from "./BookLoad";
const baseURL = import.meta.env.VITE_BACK_END_URL;

const BookPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
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
  const handleMenuClick = (e) => {
    // console.log("click", e);
    if (e.key === "2") {
      handleLogout();
    }
    if (e.key === "3") {
      navigate("/admin");
    }
  };
  const items = [
    {
      label: <span> Manage Account</span>,
      key: "1",
      icon: <MdOutlineManageAccounts />,
    },
    {
      label: "Log Out",
      key: "2",
      icon: <FiLogOut />,
      danger: true,
    },
  ];
  if (user.role) {
    items.unshift({
      label: "Admin Page",
      key: "3",
      icon: <FcManager />,
    });
  }
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const urlAvatar = `${import.meta.env.VITE_BACK_END_URL}/images/avatar/${
    user.avatar
  }`;

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params.get("id");
  const onChangeQuality = (value) => {
    // console.log("changed", value);
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowModalViewImg, setIsShowModalViewImg] = useState(false);
  const refGallery = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataBook, setDataBook] = useState(null);
  const [images, setImages] = useState([]);
  const handleCreateImg = (listItems) => {
    console.log(
      "🚀 ~ file: index.jsx:108 ~ handleCreateImg ~ listItems:",
      listItems
    );
    let tmpList = [];
    listItems.forEach((item) => {
      tmpList.push({
        original: `${baseURL}/images/book/${item}`,
        thumbnail: `${baseURL}/images/book/${item}`,
      });
    });
    setImages(tmpList);
    console.log("🚀 ~ file: index.jsx:116 ~ handleCreateImg ~ images:", images);
  };
  const fetchBookById = async () => {
    const res = await callGetBookDetailById(id);
    if (res && res.data) {
      setDataBook(res.data);
      let listItems = res.data.slider;
      listItems.unshift(res.data.thumbnail);
      handleCreateImg(listItems);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchBookById();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [id]);
  const handleFormmater = (value) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  images = [
    {
      original:
        "http://localhost:8080/images/book/11-dc801dd2a968c1a43ec9270728555fbe.jpg",
      thumbnail:
        "http://localhost:8080/images/book/11-dc801dd2a968c1a43ec9270728555fbe.jpg",
    },
  ];
  return (
    <>
      <Layout className='layout'>
        <Header>
          <div
            className='logo'
            onClick={() => {
              navigate("/");
            }}
          >
            <FaReact />
            Webdevstudios
          </div>
          <div className='logo-mobile' onClick={showDrawer}>
            <FaBars />
          </div>
          <div className='navbar-search'>
            <Input.Search
              placeholder='What are you looking for today?'
              // onSearch={}
              enterButton
              className='search-bar'
            />
            <div className='menu-item'>
              <Menu theme='dark' items={[]}></Menu>
            </div>
            {isAuthenticated === true ? (
              <div className='cart-icon'>
                <Badge count={5} offset={[-2, 5]}>
                  <ShoppingCartOutlined />
                </Badge>
              </div>
            ) : null}

            {isAuthenticated === true ? (
              <div className='account'>
                <Dropdown.Button
                  menu={menuProps}
                  size='middle'
                  placement='bottom'
                  icon={<Avatar shape='circle' src={urlAvatar}></Avatar>}
                >
                  {user.fullName}
                </Dropdown.Button>
              </div>
            ) : (
              <div
                className='account'
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </Header>

        <Content
          style={{
            padding: "0 50px",
            overflow: "initial",
            marginTop: "20px",
          }}
        >
          <div
            className='site-layout-content'
            style={{
              background: colorBgContainer,
            }}
          >
            {isLoading && !dataBook ? (
              <BookLoad />
            ) : (
              <div style={{ minHeight: "100vh" }}>
                <div className='container'>
                  <div className='left-side' style={{ cursor: "pointer" }}>
                    <ImageGallery
                      ref={refGallery}
                      items={images}
                      showFullscreenButton={false}
                      showPlayButton={false}
                      slideOnThumbnailOver={true}
                      onClick={() => {
                        setIsShowModalViewImg(true);
                        setCurrentIndex(
                          refGallery?.current?.getCurrentIndex() ?? 0
                        );
                      }}
                    />
                  </div>
                  <div className='right-side'>
                    <div className='brand'>
                      Author <a>{dataBook?.author}</a>
                    </div>
                    <h1 className='title'>{dataBook?.mainText}</h1>
                    <div className='below-title'>
                      <Rate
                        disabled
                        defaultValue={5}
                        style={{ fontSize: "14px" }}
                      />
                      <div className='sold-book'>Sold {dataBook?.sold}</div>
                    </div>
                    <div className='price'>
                      <span>{handleFormmater(dataBook?.price)} ₫</span>
                    </div>
                    <div className='ship'>
                      <label>Ship Price: </label>
                      <div> Free Ship</div>
                    </div>
                    <div className='quantity'>
                      <label>Quantity: </label>
                      <div className='input-number'>
                        {" "}
                        <InputNumber
                          min={1}
                          defaultValue={1}
                          onChange={onChangeQuality}
                        />
                      </div>
                    </div>
                    <div className='add-to-cart'>
                      <Button size='large' type='primary' icon={<BsCartPlus />}>
                        Add to cart
                      </Button>
                      <Button size='large'>Buy now</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
      {isAuthenticated === true && (
        <Drawer
          title='Menu Account'
          placement='left'
          onClose={onClose}
          open={open}
        >
          <p style={{ cursor: "pointer" }}>Manage Account</p>
          <p style={{ cursor: "pointer" }} onClick={handleLogout}>
            Log Out
          </p>
        </Drawer>
      )}
      <ModalViewImg
        open={isShowModalViewImg}
        setOpen={setIsShowModalViewImg}
        images={images}
        title={dataBook?.mainText}
        currentIndex={currentIndex}
      ></ModalViewImg>
    </>
  );
};
export default BookPage;
