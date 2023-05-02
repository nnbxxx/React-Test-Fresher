import {
  Button,
  Modal,
  Form,
  Input,
  message,
  notification,
  Col,
  Row,
} from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const ModalAddBook = (props) => {
  const [loading, setLoading] = useState(false);
  const { open, setOpen } = props;
  const [form] = Form.useForm();
  const onCreate = async (values) => {
    // console.log("Received values of form: ", values);
    // const { fullName, email, password, phone } = values;
    setLoading(true);

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
        width={`50vw`}
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
          <Row gutter={[12, 12]}>
            {" "}
            <Col span={12} key={uuidv4()}>
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} key={uuidv4()}>
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
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            {" "}
            <Col span={6} key={uuidv4()}>
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} key={uuidv4()}>
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
            </Col>
            <Col span={6} key={uuidv4()}>
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} key={uuidv4()}>
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
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddBook;
