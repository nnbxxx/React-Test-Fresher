import SearchUser from "./SearchUser";
import { TableUser } from "./TableUser";
import { Row, Col } from "antd";

const ManageUser = () => {
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <SearchUser />
        </Col>
        <Col span={24}>
          <TableUser />
        </Col>
      </Row>
    </>
  );
};
export default ManageUser;
