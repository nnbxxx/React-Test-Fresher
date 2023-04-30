import { Button, Modal } from "antd";
import { useState } from "react";
const ModalAddUser = (props) => {
  const [loading, setLoading] = useState(false);
  const { open, setOpen } = props;
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
