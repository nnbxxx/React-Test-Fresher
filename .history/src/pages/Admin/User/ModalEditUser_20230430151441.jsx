import React from "react";
import "./index.css";
import { Button, Form, Input, Modal, Radio } from "antd";
import { useState } from "react";
const ModalEditUser = (props) => {
  const [form] = Form.useForm();
  const { open, setOpen } = props;
  const onCreate = (values) => {
    //console.log("Received values of form: ", values);
    setOpen(false);
  };
  const onCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      title='Create a new collection'
      okText='Update'
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
            //console.log("Validate Failed:", info);
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
          name='title'
          label='Title'
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <Input type='text' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditUser;
