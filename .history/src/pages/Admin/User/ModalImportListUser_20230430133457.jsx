import React from "react";
import { Button, Modal, Space, Table } from "antd";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import * as XLSX from "xlsx";
const { Dragger } = Upload;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 1000);
};
let dataList = null;
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
  const columnsTable = [
    {
      title: "UserName",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];
  const propsImport = {
    name: "file",
    multiple: true,
    customRequest: dummyRequest,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      console.log(
        "🚀 ~ file: ModalImportListUser.jsx:51 ~ onChange ~ info:",
        info
      );
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setIsImport(true);
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          let reader = new FileReader();
          reader.onload = (e) => {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: "array" });
            // find the name of your sheet in the workbook first
            let worksheet = workbook.Sheets["Sheet1"];
            // convert to json format
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              range: 1,
              header: ["fullName", "email", "phone"],
            });
            console.log(
              "🚀 ~ file: ModalImportListUser.jsx:70 ~ onChange ~ jsonData:",
              jsonData
            );
          };
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
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
        maskClosable={false}
      >
        <Dragger {...propsImport}>
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
        <span style={{ padding: "15px 0", display: "block" }}>
          DataBase UpLoad
        </span>
        <Table columns={columnsTable} dataSource={[]} />
      </Modal>
    </>
  );
};
export default ModalImportFile;
