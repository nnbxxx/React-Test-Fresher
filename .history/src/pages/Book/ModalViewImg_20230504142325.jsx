import { Button, Modal } from "antd";
import { useState } from "react";
const ModalViewImg = (props) => {
  const { open, setOpen } = props;
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default ModalViewImg;
