import { Col, Divider, Pagination, Rate, Row, Spin, Tabs } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import { callGetBooksWithPaginate } from "../../service/api";
import { useOutletContext } from "react-router-dom";
const baseURL = import.meta.env.VITE_BACK_END_URL;
const convertToSlug = (Text) => {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};
/* Enhanced from: https://codepen.io/trongthanh/pen/rmYBdX */
function toSlug(str) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str
    .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, "-");

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, "");

  // return
  return str;
}

$(() => {
  let $in = $("#in");
  let $out = $("#out");

  function update() {
    $out.text(toSlug($in.val()));
  }
  update();

  $in.on("change", update);
});
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
                  <div className='column' key={item.thumbnail}>
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
