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
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};
export default ManageUser;
