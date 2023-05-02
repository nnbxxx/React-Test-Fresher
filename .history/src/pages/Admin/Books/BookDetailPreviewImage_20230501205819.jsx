import React, { useEffect } from "react";
import { Modal, Upload } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const baseURL = import.meta.env.VITE_BACK_END_URL;

const BookDetailPreviewImage = (props) => {
  const { data } = props;
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const { fileList, setFileList } = props;

  const fileImage = (fileName) => {
    return {
      uid: uuidv4(),
      name: fileName,
      status: "done",
      url: `${baseURL}/images/book/${fileName}`,
    };
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handlePreview = (file) => {
    setPreviewImage(file.url);
    setOpen(true);
    setPreviewTitle(file.thumbnail);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  useEffect(() => {
    const listPreviewImg = [fileImage(data.thumbnail)];
    data.slider.forEach((item) => {
      // return;
    });
    setFileList(listPreviewImg);
  }, [data]);
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
