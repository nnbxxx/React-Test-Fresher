import { Button, Modal } from "antd";
import { useState } from "react";
const ModalAddUser = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 200);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type='primary' onClick={showModal}>
        Open Modal with customized footer
      </Button>
      <Modal
        open={open}
        title='Title'
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default ModalAddUser;