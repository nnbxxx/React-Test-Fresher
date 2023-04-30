import { Card, Space, Button, Input } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { useRef } from "react";
const SearchUser = (props) => {
  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const handleClearSearch = () => {
    refName.current.input.value = "";
    refEmail.current.input.value = "";
    refPhone.current.input.value = "";
  };
  const handleFind = () => {
    console.log(
      "🚀 ~ file: SearchUser.jsx:6 ~ SearchUser ~ refName:",
      refName.current.input.value
    );
    console.log(
      "🚀 ~ file: SearchUser.jsx:8 ~ SearchUser ~ refEmail:",
      refEmail.current.input.value
    );
    console.log(
      "🚀 ~ file: SearchUser.jsx:10 ~ SearchUser ~ refPhone:",
      refPhone.current.input.value
    );
  };
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
              <Input ref={refEmail}></Input>
            </div>
            <div style={{ width: "33%" }}>
              <div>Phone:</div>
              <Input ref={refPhone}></Input>
            </div>
          </div>
          <Button
            type='primary'
            icon={<SearchOutlined />}
            style={{ float: "right", marginLeft: "10px" }}
            onClick={handleFind}
          >
            Search
          </Button>
          <Button
            icon={<ClearOutlined />}
            style={{ float: "right" }}
            onClick={handleClearSearch}
          >
            Clear
          </Button>
        </Card>
      </Space>
    </>
  );
};
export default SearchUser;
