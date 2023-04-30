import { Card, Space, Form, Button, Input, Col, Row } from "antd";
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
          <div style={{ display: "flex", gap: "20px" }}>
            <>
              <div>Name:</div>
              <Input></Input>
            </>

            <Input></Input>
            <Input></Input>
          </div>
        </Card>
      </Space>
    </>
  );
};
export default ManageUser;
