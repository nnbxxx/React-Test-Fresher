import { Card, Space, Form, Button, Input } from "antd";
const ManageUser = () => {
  return (
    <Space direction='vertical' size='middle'>
      <Card title='Search User' size='small'>
        <div>
          {" "}
          <Input></Input>
          <Input></Input>
          <Input></Input>
        </div>
      </Card>
    </Space>
  );
};
export default ManageUser;
