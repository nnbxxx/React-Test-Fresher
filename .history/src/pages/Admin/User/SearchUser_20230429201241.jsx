import { Card, Space, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";
const SearchUser = (props) => {
  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const handleFind = () => {
    console.log(
      "🚀 ~ file: SearchUser.jsx:22 ~ handleFind ~ refName.current.input:",
      refName.current.input
    );
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
              <Input allowClear ref={refName}></Input>
            </div>
            <div style={{ width: "33%" }}>
              <div>Email:</div>
              <Input allowClear ref={refEmail}></Input>
            </div>
            <div style={{ width: "33%" }}>
              <div>Phone:</div>
              <Input allowClear ref={refPhone}></Input>
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
        </Card>
      </Space>
    </>
  );
};
export default SearchUser;