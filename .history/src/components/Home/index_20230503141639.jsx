import { Col, Divider, Pagination, Rate, Row, Tabs } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import { callGetBooksWithPaginate } from "../../service/api";
const Home = () => {
  const onChange = (key) => {};
  const itemsTab = [
    {
      key: "1",
      label: `Popular`,
      children: <></>,
    },
    {
      key: "2",
      label: `New Product`,
      children: <></>,
    },
    {
      key: "3",
      label: `Low To High Price`,
      children: <></>,
    },
    {
      key: "4",
      label: `High To Low Price`,
      children: <></>,
    },
  ];
  const baseURL = import.meta.env.VITE_BACK_END_URL;
  //`${baseURL}/images/book/${fileName}`
  const [listBook, setlistBook] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [toltalPage, setToltalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("&sort=-sold");
  const [search, setSearch] = useState("");
  const fetchListBook = async () => {
    let query = `current=${currentPage}&pageSize=${pageSize}`;
    if (search) query += search;
    if (sort) query += sort;
    setIsLoading(true);
    const res = await callGetBooksWithPaginate(query);
    if (res && res.data) {
      setlistBook(res.data.result);
      setToltalPage(res.data.meta.total);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    fetchListBook();
  }, [currentPage, pageSize, search, sort]);
  console.log("🚀 ~ file: index.jsx:30 ~ Home ~ listBook:", listBook);

  return (
    <Col>
      <Row>
        <Tabs defaultActiveKey='1' items={itemsTab} onChange={onChange} />
      </Row>
      <Row className='customize-row'>
        {listBook &&
          listBook.length > 0 &&
          listBook.map((item) => {
            return (
              <>
                <div className='column'>
                  <div className='wrapper'>
                    <div className='thumbnail'>
                      <img
                        src='http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg'
                        //`${baseURL}/images/book/${fileName}`
                        alt='thumbnail book'
                      />
                    </div>
                    <div className='text'>
                      Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và
                      Sáng Suốt Hơn
                    </div>
                    <div className='price'>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(70000)}
                    </div>
                    <div className='rating'>
                      <Rate
                        value={5}
                        disabled
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      <span>Đã bán 1k</span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </Row>
      <Divider />
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={currentPage}
          total={toltalPage}
          responsive
          pageSize={pageSize}
        />
      </Row>
    </Col>
  );
};
export default Home;
/*
 total: toltalPage,
showSizeChanger: true,
current: currentPage,
pageSize: pageSize,
pageSizeOptions: ["2", "10", "20", "30", "50"],
responsive: true,
showTotal: (total, range) => {
  return `${range[0]}-${range[1]} of ${total} items`;
},
},
*/
