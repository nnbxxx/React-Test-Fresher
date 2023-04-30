import { Card, Space, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";
const SearchUser = (props) => {
  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const { fetchListUser } = props;
  const handleFind = () => {
    let search = "";
    if (refName.current.input.value) {
      //search += `&fullName=/${refName.current.input.value}/i`;
    }
    if (refEmail.current.input.value) {
      //search += `&fullName=/${refEmail.current.input.value}/i`;
    }
    if (refPhone.current.input.value) {
      //search += `&fullName=/${refPhone.current.input.value}/i`;
    }

    console.log("🚀 ~ file: SearchUser.jsx:22 ~ handleFind ~ search:", search);
    if (search) fetchListUser(search);
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
