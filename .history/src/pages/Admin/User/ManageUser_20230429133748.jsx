import { Card, Space, Form, Button, Input } from "antd";
const ManageUser = () => {
  return (
    <Space
      direction='vertical'
      size='middle'
      style={{
        display: "flex",
      }}
    >
      <Card title='Search User' size='small'>
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Card>
    </Space>
  );
};
export default ManageUser;
