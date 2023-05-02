import React from "react";
import { Modal, Upload } from "antd";
import { useState } from "react";
const baseURL = import.meta.env.VITE_BACK_END_URL;

const BookDetailPreviewImage = (props) => {
  const { data } = props;
  console.log(
    "🚀 ~ file: BookDetailPreviewImage.jsx:13 ~ BookDetailPreviewImage ~ data:",
    data
  );
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const urlImg = `${baseURL}/images/book/${data.thumbnail}`;
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => {
    setOpen(false);
  };
  const handlePreview = (file) => {
    setPreviewImage(file.url);
    setOpen(true);
    setPreviewTitle(file.thumbnail);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <>
      <Upload
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        showUploadList={{ showRemoveIcon: false }}
      ></Upload>
      <Modal
        open={open}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt=''
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default BookDetailPreviewImage;
