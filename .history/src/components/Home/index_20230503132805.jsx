import { Col, Divider, Pagination, Rate, Row, Tabs } from "antd";
import "./index.scss";
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
  return (
    <Col>
      <Row>
        <Tabs defaultActiveKey='1' items={itemsTab} onChange={onChange} />
      </Row>
      <Row className='customize-row'>
        <div className='column'>
          <div className='wrapper'>
            <div className='thumbnail'>
              <img
                src='http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg'
                alt='thumbnail book'
              />
            </div>
            <div className='text'>
              Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng
              Suốt Hơn
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

        <div className='column'>
          <div className='wrapper'>
            <div className='thumbnail'>
              <img
                src='http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg'
                alt='thumbnail book'
              />
            </div>
            <div className='text'>
              Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng
              Suốt Hơn
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

        <div className='column'>
          <div className='wrapper'>
            <div className='thumbnail'>
              <img
                src='http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg'
                alt='thumbnail book'
              />
            </div>
            <div className='text'>
              Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng
              Suốt Hơn
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

        <div className='column'>
          <div className='wrapper'>
            <div className='thumbnail'>
              <img
                src='http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg'
                alt='thumbnail book'
              />
            </div>
            <div className='text'>
              Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng
              Suốt Hơn
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

        <div className='column'>
          <div className='wrapper'>
            <div className='thumbnail'>
              <img
                src='http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg'
                alt='thumbnail book'
              />
            </div>
            <div className='text'>
              Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng
              Suốt Hơn
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

        <div className='column'>
          <div className='wrapper'>
            <div className='thumbnail'>
              <img
                src='http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg'
                alt='thumbnail book'
              />
            </div>
            <div className='text'>
              Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng
              Suốt Hơn
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
      </Row>
      <Divider />
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Pagination total: toltalPage,
          showSizeChanger: true,
          current: currentPage,
          pageSize: pageSize,
          pageSizeOptions: ["2", "10", "20", "30", "50"],
          responsive: true,
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} of ${total} items`;
          }, responsive />
        
      </Row>
    </Col>
  );
};
export default Home;
