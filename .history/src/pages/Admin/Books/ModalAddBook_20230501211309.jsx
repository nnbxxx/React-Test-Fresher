import { Button, Modal, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { callPostCreateUser } from "../../../service/api";
const ModalAddUser = (props) => {
  const [loading, setLoading] = useState(false);
  const { open, setOpen } = props;
  const [form] = Form.useForm();
  const onCreate = async (values) => {
    // console.log("Received values of form: ", values);
    const { fullName, email, password, phone } = values;
    setLoading(true);
    const res = await callPostCreateUser(fullName, email, password, phone);
    if (res && res.data) {
      message.success("Create User Sucessful");
    } else if (res && res.error) {
      notification.error({
        message: `Error`,
        description: res.message[0],
        placement: "topRight",
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 100);
    setOpen(false);
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        title='Create New User'
        okText='Create'
        cancelText='Cancel'
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
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
            name='fullName'
            label='UserName'
            rules={[
              {
                required: true,
                message: "Please input the Username of User!",
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
                message: "Please input the Password of User!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              {
                required: true,
                message: "Please input the Email of User",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='phone'
            label='Phone'
            rules={[
              {
                required: true,
                message: "Please input the Phone of User!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddUser;
