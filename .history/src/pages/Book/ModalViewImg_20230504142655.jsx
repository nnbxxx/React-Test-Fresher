import { Button, Modal } from "antd";
import { useState } from "react";
const ModalViewImg = (props) => {
  const { open, setOpen } = props;

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onCancel={handleCancel} footer={null} width={"50vw"}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default ModalViewImg;
