import React from "react";
import { Button, Form, Input, Modal, Radio } from "antd";
import { useState } from "react";
const ModalEditUser = (props) => {
  const [form] = Form.useForm();
  const { open, setOpen, data } = props;
  console.log("🚀 ~ file: ModalEditUser.jsx:7 ~ ModalEditUser ~ data:", data);
  let initData = {
    _id: data._id,
  };
  const onCreate = (values) => {
    setOpen(false);
  };
  const onCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <Modal
      open={open}
      title='Create a new collection'
      okText='Update'
      cancelText='Cancel'
      onCancel={() => {
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout='vertical' name='form_in_modal'>
        <Form.Item
          name='_id'
          label='Id'
          hidden={false}
          rules={[
            {
              required: true,
              message: "Please input the id of user!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditUser;
