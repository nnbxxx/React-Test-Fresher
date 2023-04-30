import { Card, Space, Form, Button, Input, Col, Row } from "antd";
const ManageUser = () => {
  return (
    <>
      <Space
        direction='vertical'
        size={[10, 10]}
        wrap
        style={{ maxWidth: "100%", display: "Block" }}
      >
        <Card title='Search User' size='small' style={{ display: "flex" }}>
          <Row span={24}>
            <Col>
              {" "}
              <Input></Input>
            </Col>
            <Col>
              {" "}
              <Input></Input>
            </Col>
            <Col>
              {" "}
              <Input></Input>
            </Col>
          </Row>
        </Card>
      </Space>
    </>
  );
};
export default ManageUser;
