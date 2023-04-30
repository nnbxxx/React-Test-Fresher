import React from "react";
import { Button, Modal, Space } from "antd";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      //console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    // console.log("Dropped files", e.dataTransfer.files);
  },
};
const ModalImportFile = (props) => {
  const { open, setOpen } = props;
  const [isImport, setIsImport] = useState(false);
  const handleOk = (e) => {
    // console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    // console.log(e);
    setOpen(false);
  };
  return (
    <>
      <Modal
        title='Import Data User'
        width={"50vw"}
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
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Support for a single. Only accept .csv .xls .xlxs
          </p>
        </Dragger>
        <Space>DataBase UpLoad</Space>
      </Modal>
    </>
  );
};
export default ModalImportFile;
