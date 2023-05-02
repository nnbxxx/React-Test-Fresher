import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Alert, Modal, Upload, message } from "antd";
import { useState } from "react";
import { callUploadBookImg } from "../../../service/api";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UpLoadImageBook = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const [fileList, setFileList] = useState([]);
  const { name, uploadConfig } = props;
  const { data, setData } = props;
  const handleUpLoadFile = async ({ file, onSuccess, onError }) => {
    console.log(
      "🚀 ~ file: UpLoadImageBook.jsx:21 ~ handleUpLoadFile ~ file:",
      file
    );
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      if (name === "slider") {
        onSuccess("ok");
      }
    }
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <>
      <Upload
        {...uploadConfig}
        name={name}
        customRequest={handleUpLoadFile}
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        onRemove={null}
      >
        {uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt='example'
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UpLoadImageBook;
