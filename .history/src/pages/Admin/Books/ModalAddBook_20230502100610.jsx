import {
  Button,
  Modal,
  Form,
  Input,
  message,
  notification,
  Col,
  Row,
  InputNumber,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UpLoadImageBook from "./UpLoadImageBook";
import { callGetBooksCategory } from "../../../service/api";

const ModalAddBook = (props) => {
  const [loading, setLoading] = useState(false);
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
    form.resetFields();
  };

  const [listCategory, setListCategory] = useState([]);
  const fetchCategoryBook = async () => {
    const res = await callGetBooksCategory();
    let listTmp = [];
    if (res && res.data) {
      res.data.forEach((item) => {
        listTmp.push({ value: item, label: item });
      });
    }
    setListCategory(listTmp);
  };
  useEffect(() => {
    fetchCategoryBook();
  }, []);
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
          autoComplete='off'
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
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  addonAfter='VND'
                />
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
                <Select
                  showSearch
                  allowClear
                  //  onChange={handleChange}
                  options={listCategory}
                />
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
                <InputNumber min={0} />
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
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            {" "}
            <Col span={12} key={uuidv4()}>
              <Form.Item label='Thumbnail Image'>
                <UpLoadImageBook
                  name='thumbnail'
                  uploadConfig={{ multiple: false, maxCount: 1 }}
                ></UpLoadImageBook>
              </Form.Item>
            </Col>
            <Col span={12} key={uuidv4()}>
              <Form.Item label='Slider Image'>
                <UpLoadImageBook
                  name='slider'
                  uploadConfig={{ multiple: true }}
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