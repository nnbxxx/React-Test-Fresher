import SearchUser from "./SearchUser";
import { TableUser } from "./TableUser";
import { Row } from "antd";

const ManageUser = () => {
  return (
    <>
      <Row gutter={[20, 20]}></Row>
      <SearchUser />
      <TableUser />
    </>
  );
};
export default ManageUser;
