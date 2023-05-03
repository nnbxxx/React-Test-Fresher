import { Col, Divider, Pagination, Rate, Row, Spin, Tabs } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import { callGetBooksWithPaginate } from "../../service/api";
import { useNavigate, useOutletContext } from "react-router-dom";
const baseURL = import.meta.env.VITE_BACK_END_URL;
const nonAccentVietnamese = (str) => {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};
const convertSlug = (str) => {
  str = nonAccentVietnamese(str);
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();
  // remove accents, swap ñ for n, etc
  const from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
  const to =
    "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
  return str;
};

const Home = (props) => {
  const onChangeTab = (key) => {
    setSort(key);
  };
  const itemsTab = [
    {
      key: "&sort=-sold",
      label: `Popular`,
      children: <></>,
    },
    {
      key: "&sort=-updatedAt",
      label: `New Product`,
      children: <></>,
    },
    {
      key: "&sort=price",
      label: `Low To High Price`,
      children: <></>,
    },
    {
      key: "&sort=-price",
      label: `High To Low Price`,
      children: <></>,
    },
  ];
  const [filter, setFilter] = useOutletContext();
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
    if (filter) query += filter;
    setIsLoading(true);
    const res = await callGetBooksWithPaginate(query);
    if (res && res.data) {
      setlistBook(res.data.result);
      setToltalPage(res.data.meta.total);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  };
  const navigate = useNavigate();
  const handleDirectDetailBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };
  useEffect(() => {
    fetchListBook();
  }, [currentPage, pageSize, search, sort, filter]);
  return (
    <Col>
      <Row>
        <Tabs defaultActiveKey='1' items={itemsTab} onChange={onChangeTab} />
      </Row>
      <Spin tip='Loading' size='large' spinning={isLoading}>
        <Row className='customize-row'>
          {listBook &&
            listBook.length > 0 &&
            listBook.map((item) => {
              return (
                <>
                  <div
                    className='column'
                    key={item.thumbnail}
                    onClick={() => {
                      handleDirectDetailBook(item);
                    }}
                  >
                    <div className='wrapper'>
                      <div className='thumbnail'>
                        <img
                          src={`${baseURL}/images/book/${item.thumbnail}`}
                          alt='thumbnail book'
                        />
                      </div>
                      <div className='text'>{item.mainText}</div>
                      <div className='price'>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </div>
                      <div className='rating'>
                        <Rate
                          value={5}
                          disabled
                          style={{ color: "#ffce3d", fontSize: 10 }}
                        />
                        <span>Sold: {item.sold}</span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </Row>
      </Spin>
      <Divider />
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={currentPage}
          total={toltalPage}
          responsive
          pageSize={pageSize}
          pageSizeOptions={["2", "5", "10"]}
          showSizeChanger
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
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
pageSizeOptions: ["2", "5", "10", "30", "50"],
responsive: true,
showTotal: (total, range) => {
  return `${range[0]}-${range[1]} of ${total} items`;
},
},
*/
