import { Card, Space, Form, Button } from "antd";
const ManageUser = () => {
  return (
    <Space
      direction='vertical'
      size='middle'
      style={{
        display: "flex",
      }}
    >
      <Form title='Search User' size='small'>
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Space>
  );
};
export default ManageUser;
