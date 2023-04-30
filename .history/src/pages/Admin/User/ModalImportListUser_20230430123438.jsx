import React from "react";
import { Button, Modal } from "antd";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const ModalImportFile = (props) => {
  const { open, setOpen } = props;
  const [isImport, setIsImport] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  return (
    <>
      <Modal
        title='Import Data User'
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Import File"}
        okButtonProps={{
          disabled: !isImport,
        }}
        cancelButtonProps={{
          disabled: false,
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default ModalImportFile;
