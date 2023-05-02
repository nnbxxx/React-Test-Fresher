import React, { useEffect } from "react";
import { Modal, Upload } from "antd";
import { useState } from "react";
const baseURL = import.meta.env.VITE_BACK_END_URL;

const BookDetailPreviewImage = (props) => {
  const { data } = props;
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const urlImg = `${baseURL}/images/book/${data.thumbnail}`;
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => {
    setOpen(false);
    setFileList([]);
  };
  const handlePreview = (file) => {
    setPreviewImage(file.url);
    setOpen(true);
    setPreviewTitle(file.thumbnail);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  useEffect(() => {
    const listPreviewImg = [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: urlImg,
      },
    ];
    setFileList(listPreviewImg);
  }, []);
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
