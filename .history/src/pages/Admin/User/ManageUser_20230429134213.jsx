import { Card, Space, Form, Button, Input, Col, Row } from "antd";
const ManageUser = () => {
  return (
    <>
      <Space direction='vertical' size='middle'>
        <Card title='Search User' size='small' aria-colspan={3}>
          <Input></Input>
          <Input></Input>
          <Input></Input>
        </Card>
      </Space>
    </>
  );
};
export default ManageUser;