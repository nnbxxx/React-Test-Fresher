import SearchUser from "./SearchUser";
import { TableUser } from "./TableUser";
import { Row } from "antd";

const ManageUser = () => {
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <SearchUser />{" "}
        </Col>
      </Row>

      <TableUser />
    </>
  );
};
export default ManageUser;
