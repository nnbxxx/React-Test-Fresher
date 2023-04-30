import { Card, Space, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
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
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
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
          <Button
            type='primary'
            icon={<SearchOutlined />}
            style={{ float: "right" }}
          >
            Search
          </Button>
          <Button
            type='primary'
            icon={<SearchOutlined />}
            style={{ float: "right" }}
          >
            Clear
          </Button>
        </Card>
      </Space>
    </>
  );
};
export default ManageUser;
