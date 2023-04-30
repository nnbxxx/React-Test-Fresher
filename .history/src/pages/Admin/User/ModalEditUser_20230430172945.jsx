import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";
import { useState } from "react";
import { callPutUpdateUser } from "../../../service/api";
const ModalEditUser = (props) => {
  const [form] = Form.useForm();
  const { open, setOpen, data } = props;
  const onUpdate = (values) => {
    const { _id, fullName, phone } = values;
    const res = callPutUpdateUser(_id, fullName, phone);
    console.log("🚀 ~ file: ModalEditUser.jsx:12 ~ onUpdate ~ res:", res);
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
      forceRender
      open={open}
      title='Update User'
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
            onUpdate(values);
          })
          .catch((info) => {
            //console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout='vertical' name='form_in_modal' size='large'>
        <Form.Item
          name='_id'
          label='Id'
          hidden
          rules={[
            {
              required: true,
              message: "Please input the id of user!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='fullName'
          label='UserName'
          rules={[
            {
              required: true,
              message: "Please input the UserName of user!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              required: true,
              message: "Please input the Email of user!",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name='phone'
          label='Phone'
          rules={[
            {
              required: true,
              message: "Please input the Phone of user!",
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
