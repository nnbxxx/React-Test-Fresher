import { Button, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import { callPostCreateUser } from "../../../service/api";
const ModalAddUser = (props) => {
  const [loading, setLoading] = useState(false);
  const { open, setOpen } = props;
  const [form] = Form.useForm();
  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    const { fullName, email, password, phone } = values;
    setLoading(true);
    let res = callPostCreateUser(fullName, email, password, phone);
    if (res && res.data) {
      message.error("Create User Sucessful");
    } else {
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
        title='Create a new collection'
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
            name='fulName'
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
