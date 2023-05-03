import React, { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Row,
  Select,
  Upload,
} from "antd";
import {
  callGetBooksCategory,
  callPostCreateBook,
  callUploadBookImg,
} from "../../../service/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const baseURL = import.meta.env.VITE_BACK_END_URL;
const ModalEditBook = (props) => {
  const { open, setOpen } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();

  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);
  const [fileListThumbnail, setFileListThumbnail] = useState([]);
  const [fileListSlider, setFileListSlider] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const { data } = props;

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callGetBooksCategory();
      if (res && res.data) {
        const d = res.data.map((item) => {
          return { label: item, value: item };
        });
        setListCategory(d);
      }
    };
    fetchCategory();
  }, []);

  const onFinish = async (values) => {
    if (dataThumbnail.length === 0) {
      notification.error({ message: "Please Upload Image Thumbnail" });
      return;
    }
    if (dataSlider.length === 0) {
      notification.error({ message: "Please Upload Image Slider" });
      return;
    }
    const { mainText, author, price, sold, quantity, category } = values;
    const sliderImgName = dataSlider.map((item) => {
      return item.name;
    });
    // const res = await callPostCreateBook(
    //   dataThumbnail[0].name,
    //   sliderImgName,
    //   mainText,
    //   author,
    //   price,
    //   sold,
    //   quantity,
    //   category
    // );
    // if (res && res.data) {
    //   message.success("Create new Book Successful");
    //   form.resetFields();
    //   setDataSlider([]);
    //   setDataThumbnail([]);
    // }
    return;
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChangeThumbnail = ({ fileListThumbnail: newFileList }) => {
    return setFileListThumbnail(newFileList);
  };
  const handleChangeSlider = ({ fileListSlider: newFileList }) => {
    return setFileListSlider(newFileList);
  };

  const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      setDataThumbnail([
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };

  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      //copy previous state => upload multiple images
      setDataSlider((dataSlider) => [
        ...dataSlider,
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };

  const handleRemoveFile = (file, type) => {
    if (type === "thumbnail") {
      setDataThumbnail([]);
    }
    if (type === "slider") {
      const newSlider = dataSlider.filter((x) => x.uid !== file.uid);
      setDataSlider(newSlider);
    }
  };

  const handlePreview = async (file) => {
    console.log(
      "🚀 ~ file: ModalEditBook.jsx:163 ~ handlePreview ~ file:",
      file
    );
    // getBase64(file.originFileObj, (url) => {
    //   setPreviewImage(url);
    //   setPreviewOpen(true);
    //   setPreviewTitle(
    //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    //   );
    // });
  };
  const fileImage = (fileName) => {
    return {
      uid: uuidv4(),
      name: fileName,
      status: "done",
      url: `${baseURL}/images/book/${fileName}`,
    };
  };
  useEffect(() => {
    form.setFieldsValue(data);
    console.log(
      "🚀 ~ file: ModalEditBook.jsx:40 ~ ModalEditBook ~ data:",
      data
    );
    setFileListThumbnail([fileImage(data.thumbnail)]);
    const listPreviewImg = [];
    data.slider.forEach((item) => {
      listPreviewImg.push(fileImage(item));
    });
    setFileListSlider(listPreviewImg);
    return () => {
      form.resetFields();
    };
  }, [data]);
  return (
    <>
      <Modal
        title='Update Book'
        open={open}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
        okText={"Update"}
        cancelText={"Cancel"}
        confirmLoading={isSubmit}
        width={"50vw"}
        //do not close when click fetchBook
        maskClosable={false}
      >
        <Divider />

        <Form form={form} name='basic' onFinish={onFinish} autoComplete='off'>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Name Book'
                name='mainText'
                rules={[
                  { required: true, message: "Please input the name of Book!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Author'
                name='author'
                rules={[
                  {
                    required: true,
                    message: "Please input the Author of Book!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Price'
                name='price'
                rules={[
                  {
                    required: true,
                    message: "Please input the Price of Book!",
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
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Category'
                name='category'
                rules={[
                  {
                    required: true,
                    message: "Please input the Category of Book!",
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
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Quantity'
                name='quantity'
                rules={[
                  {
                    required: true,
                    message: "Please input the Quantity of Book!",
                  },
                ]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Sold'
                name='sold'
                rules={[
                  {
                    required: true,
                    message: "Please input the Sold of Book!",
                  },
                ]}
                initialValue={0}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Image Thumbnail'
                name='thumbnail'
              >
                <Upload
                  name='thumbnail'
                  listType='picture-card'
                  className='avatar-uploader'
                  maxCount={1}
                  multiple={false}
                  customRequest={handleUploadFileThumbnail}
                  beforeUpload={beforeUpload}
                  onChange={handleChangeThumbnail}
                  onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                  onPreview={handlePreview}
                  fileList={fileListThumbnail}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Image Slider'
                name='slider'
              >
                <Upload
                  multiple
                  name='slider'
                  listType='picture-card'
                  className='avatar-uploader'
                  customRequest={handleUploadFileSlider}
                  beforeUpload={beforeUpload}
                  onChange={handleChangeSlider}
                  onRemove={(file) => handleRemoveFile(file, "slider")}
                  onPreview={handlePreview}
                  fileList={fileListSlider}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt='example' style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
export default ModalEditBook;
