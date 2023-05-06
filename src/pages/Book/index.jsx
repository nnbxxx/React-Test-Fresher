import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Layout, theme, Button, Rate, InputNumber } from "antd";
const { Header, Content, Footer } = Layout;
import { BsCartPlus } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { callGetBookDetailById } from "../../service/api";
import "./index.scss";
import ImageGallery from "react-image-gallery";
import ModalViewImg from "./ModalViewImg";
import BookLoad from "./BookLoad";
import { doAddBookAction } from "../../redux/order/orderSlice";
import HeaderUser from "../../components/Header/HeaderUser";
const baseURL = import.meta.env.VITE_BACK_END_URL;
const BookPage = (props) => {
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [quantityBook, setQuantityBook] = useState(1);
  const onChangeQuality = (value) => {
    setQuantityBook(value);
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowModalViewImg, setIsShowModalViewImg] = useState(false);
  const refGallery = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataBook, setDataBook] = useState(null);
  const [images, setImages] = useState([]);
  const handleCreateImg = (listItems) => {
    let tmpList = [];
    listItems.forEach((item) => {
      tmpList.push({
        original: `${baseURL}/images/book/${item}`,
        thumbnail: `${baseURL}/images/book/${item}`,
      });
    });
    setImages(tmpList);
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
  const handleAddToCart = (quanlity, dataBook) => {
    dispatch(
      doAddBookAction({ quanlity, detail: dataBook, _id: dataBook._id })
    );
  };
  return (
    <>
      <Layout className='layout'>
        <HeaderUser />
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
                  <div
                    className='right-side'
                    style={{ display: "flex", gap: 10 }}
                  >
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
                          max={dataBook?.quantity}
                          defaultValue={1}
                          onChange={onChangeQuality}
                        />
                      </div>
                    </div>
                    <div className='add-to-cart'>
                      <Button
                        size='large'
                        type='primary'
                        icon={<BsCartPlus />}
                        onClick={() => handleAddToCart(quantityBook, dataBook)}
                      >
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
