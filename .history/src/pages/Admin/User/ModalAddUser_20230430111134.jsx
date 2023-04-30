import { Button, Modal, Form, Input, Radio } from "antd";
import { useState } from "react";
const ModalAddUser = (props) => {
  const [loading, setLoading] = useState(false);
  const { open, setOpen } = props;
  const [form] = Form.useForm();
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        title='Create a new collection'
        okText='Create'
        cancelText='Cancel'
        onCancel={onCancel}
        onOk={() => {
          setLoading(true);
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
              setTimeout(() => {
                setLoading(false);
              }, 200);
            })
            .catch((info) => {
              // console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout='vertical'
          name='form_in_modal'
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name='fulName'
            label='UserName'
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input type='password' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddUser;
