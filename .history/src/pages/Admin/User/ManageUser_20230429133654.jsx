import { Card, Space, Form, Button, Input } from "antd";
const ManageUser = () => {
  return (
    <Space direction='vertical' size='middle'>
      <Card
        title='Search User'
        size='small'
        style={{
          display: "flex",
        }}
      >
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Card>
    </Space>
  );
};
export default ManageUser;
