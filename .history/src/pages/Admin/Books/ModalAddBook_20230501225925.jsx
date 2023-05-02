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
import UpLoadImageBook from "./UpLoadImageBook";
const ModalAddBook = (props) => {
  const [loading, setLoading] = useState(false);
  const [fileListThumnail, setfileListThumnail] = useState([]);
  const [fileListSlider, setFileListSlider] = useState([]);
  const handleChangeThumnail = ({ fileListThumnail: newFileList }) =>
    setfileListThumnail(newFileList);
  const handleChangeSlider = ({ fileListSlider: newFileList }) =>
    setFileListSlider(newFileList);

  const { open, setOpen } = props;
  const [form] = Form.useForm();
  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    // const { fullName, email, password, phone } = values;
    setLoading(true);

    setTimeout(() => {
      //API create book
      setLoading(false);
    }, 100);
    setOpen(false);
  };
  const onCancel = () => {
    setOpen(false);
    setfileListThumnail([]);
    setFileListSlider([]);
    form.resetFields();
  };

  return (
    <>
      <Modal
        open={open}
        width={`50vw`}
        title='Create New Book'
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
                name='mainText'
                label='Name'
                rules={[
                  {
                    required: true,
                    message: "Please input the Name of Book!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} key={uuidv4()}>
              <Form.Item
                name='author'
                label='Author'
                rules={[
                  {
                    required: true,
                    message: "Please input the author of Book",
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
                name='price'
                label='Price'
                rules={[
                  {
                    required: true,
                    message: "Please input the price of Book!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} key={uuidv4()}>
              <Form.Item
                name='sold'
                label='Sold'
                rules={[
                  {
                    required: true,
                    message: "Please input the Sold of Book",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} key={uuidv4()}>
              <Form.Item
                name='quantity'
                label='Quantity'
                rules={[
                  {
                    required: true,
                    message: "Please input the quantity of Book!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} key={uuidv4()}>
              <Form.Item
                name='category'
                label='Category'
                rules={[
                  {
                    required: true,
                    message: "Please input the category of Book",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            {" "}
            <Col span={12} key={uuidv4()}>
              <Form.Item name='thumbnail' label='Thumbnail Image'>
                <UpLoadImageBook
                  uploadConfig={{ multiple: false, maxCount: 1 }}
                  fileList={fileListThumnail}
                  setFileList={setfileListThumnail}
                  handleChange={handleChangeThumnail}
                ></UpLoadImageBook>
              </Form.Item>
            </Col>
            <Col span={12} key={uuidv4()}>
              <Form.Item name='slider' label='Slider Image'>
                <UpLoadImageBook
                  uploadConfig={{ multiple: true }}
                  fileList={fileListSlider}
                  setFileList={setFileListSlider}
                  handleChange={handleChangeSlider}
                ></UpLoadImageBook>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddBook;
