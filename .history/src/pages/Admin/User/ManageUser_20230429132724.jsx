import { Card, Space } from "antd";
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
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title='Search User' size='small'>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
  );
};
export default ManageUser;
