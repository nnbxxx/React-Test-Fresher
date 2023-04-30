import { Button, Modal, Form, Input, Radio } from "antd";
import { useState } from "react";
const ModalAddUser = (props) => {
  const [loading, setLoading] = useState(false);
  const { open, setOpen } = props;
  const [form] = Form.useForm();
  const formLayout = "Vertical";
  const handleOk = () => {
    setLoading(true);
    // form.submit();
    form.resetFields();
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
        title='Add new User'
        onCancel={() => {
          form.resetFields();
          handleCancel();
        }}
        footer={[
          <Button
            type='primary'
            loading={loading}
            onClick={() => {
              // form.submit();
              form.resetFields();
              console.log(
                "🚀 ~ file: ModalAddUser.jsx:37 ~ ModalAddUser ~ form:",
                form
              );
              handleOk();
            }}
          >
            Submit
          </Button>,
        ]}
      ></Modal>
    </>
  );
};
export default ModalAddUser;
