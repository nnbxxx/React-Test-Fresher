import { Card, Space, Form, Button, Input, Col, Row } from "antd";
const ManageUser = () => {
  return (
    <>
      <Space direction='vertical' size='middle' wrap>
        <Card title='Search User' size='small'>
          <Row span={8}>
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
