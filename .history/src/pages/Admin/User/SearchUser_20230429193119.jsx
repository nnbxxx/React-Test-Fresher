import { Card, Space, Button, Input } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { useRef } from "react";
const SearchUser = () => {
  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPhone = useRef(null);
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
              <Input ref={refName}></Input>
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
            style={{ float: "right", marginLeft: "10px" }}
          >
            Search
          </Button>
          <Button icon={<ClearOutlined />} style={{ float: "right" }}>
            Clear
          </Button>
        </Card>
      </Space>
    </>
  );
};
export default SearchUser;
