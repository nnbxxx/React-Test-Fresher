import { Card, Col, Row, Statistic } from "antd";
import { useEffect } from "react";
import CountUp from "react-countup";
import { callGetDashBoard } from "../../service/api";
import { useState } from "react";
const AdminPage = () => {
  const formatter = (value) => <CountUp end={value} separator=',' />;
  const [dashBoard, setDashBoard] = useState({});
  useEffect(() => {
    const fetchDataDashBoard = async () => {
      const res = await callGetDashBoard();
      if (res && res.data) {
        setDashBoard(res.data);
      }
    };
    fetchDataDashBoard();
  }, []);
  return (
    <>
      <Row gutter={[40, 40]}>
        <Col span={10}>
          <Card title='' bordered={false}>
            <Statistic
              title='Totals Users'
              value={dashBoard.countUser}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card title='' bordered={false}>
            <Statistic
              title='Totals Orders'
              value={dashBoard.countOrder}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default AdminPage;
