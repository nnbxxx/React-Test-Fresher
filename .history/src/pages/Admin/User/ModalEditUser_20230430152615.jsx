import React from "react";
import { Button, Form, Input, Modal, Radio } from "antd";
import { useState } from "react";
const ModalEditUser = (props) => {
  const [form] = Form.useForm();
  const { open, setOpen, data } = props;
  const initData = {
    modifier: "public",
    title: "abc",
  };
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
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={initData}
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
          <Input type='textarea' />
        </Form.Item>
        <Form.Item
          name='modifier'
          className='collection-create-form_last-form-item'
        >
          <Radio.Group>
            <Radio value='public'>Public</Radio>
            <Radio value='private'>Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditUser;
