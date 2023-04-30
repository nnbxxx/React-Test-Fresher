import { Card, Space, Form, Button, Input, Col, Row } from "antd";
const ManageUser = () => {
  return (
    <>
      <Space direction='vertical' size='middle'>
        <Card title='Search User' size='small' wrap={true}>
          <Row span={6}>
            <Input></Input>
            <Input></Input>
            <Input></Input>
          </Row>
        </Card>
      </Space>
    </>
  );
};
export default ManageUser;
