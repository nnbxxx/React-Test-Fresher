import React from "react";
import { Button, Modal } from "antd";
import { useState } from "react";
const ModalImportFile = (props) => {
  const { open, setOpen } = props;
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
        title='Basic Modal'
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Import File"}
        okButtonProps={{
          disabled: true,
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
