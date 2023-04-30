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
      <Space.Compact></Space.Compact>
      <Card title='Card' size='small'>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
  );
};
export default ManageUser;
