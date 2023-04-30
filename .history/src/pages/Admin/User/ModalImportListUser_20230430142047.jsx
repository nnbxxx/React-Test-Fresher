import React from "react";
import { Button, Modal, Space, Table, notification } from "antd";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import * as XLSX from "xlsx";
import { callPostUserExcel } from "../../../service/api";
const { Dragger } = Upload;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 1000);
};
const ModalImportFile = (props) => {
  const { open, setOpen } = props;
  const [isImport, setIsImport] = useState(false);
  const [dataExcel, setdataExcel] = useState([]);
  const handleOk = async (e) => {
    // console.log(e);
    let data = dataExcel.map((item) => {
      item["password"] = "123456";
      return item;
    });
    const res = await callPostUserExcel(data);
    if (res && res.data && res.data.countError === 0) {
      notification.success({
        message: "Successful Upload File",
        description: "Successful Upload File",
      });
    } else if (res && res.data && res.data.countError > 0) {
      notification.warning({
        message: "Successful Upload File",
        description: `Success: ${res.data.countSuccess}  Error${res.data.countError} `,
      });
    }
  };
  const handleCancel = (e) => {
    // console.log(e);
    setdataExcel([]);
    setOpen(false);
    setIsImport(false);
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
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setIsImport(true);
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = (e) => {
            let data = new Uint8Array(reader.result);
            let workbook = XLSX.read(data, { type: "array" });
            // find the name of your sheet in the workbook first
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // convert to json format
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              range: 1,
              header: ["fullName", "email", "phone"],
            });
            if (jsonData && jsonData.length > 0) {
              setdataExcel(jsonData);
            }
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
        <Table
          columns={columnsTable}
          rowKey='__rowNum__'
          dataSource={dataExcel}
          pagination={{ pageSize: "5" }}
          scroll={{
            y: 200,
          }}
        />
      </Modal>
    </>
  );
};
export default ModalImportFile;
