import { Card, Space, Button, Input } from "antd";
const ManageUser = () => {
  return (
    <>
      <Space
        direction='vertical'
        size={[10, 10]}
        wrap
        style={{ maxWidth: "100%", display: "Block" }}
      >
        <Card title='Search User' size='small'>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ width: "33%" }}>
              <div>Name:</div>
              <Input></Input>
            </div>
            <div style={{ width: "33%" }}>
              <div>Email:</div>
              <Input></Input>
            </div>
            <div style={{ width: "33%" }}>
              <div>Phone:</div>
              <Input></Input>
            </div>
          </div>
        </Card>
      </Space>
    </>
  );
};
export default ManageUser;
