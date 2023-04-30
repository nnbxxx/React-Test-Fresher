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
              handleOk();
            }}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          layout={formLayout}
          form={form}
          labelCol={{ span: 24 }}
          key={`125`}
        >
          <Form.Item label='User name: '>
            <Input
              rules={[
                {
                  required: true,
                  message: "Please input your name",
                },
              ]}
              key={`123`}
            />
          </Form.Item>
          <Form.Item label='Field B'>
            <Input placeholder='input placeholder' key={`124`} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddUser;
