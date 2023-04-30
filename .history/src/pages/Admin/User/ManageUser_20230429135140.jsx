import { Card, Space, Form, Button, Input, Col, Row } from "antd";
const ManageUser = () => {
  return (
    <>
      <Space
        direction='vertical'
        size='small'
        wrap
        style={{ maxWidth: "100%", display: "Block" }}
      >
        <Card title='Search User' size='small'>
          <Row span={8}>
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
