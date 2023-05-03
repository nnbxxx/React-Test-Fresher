// import {
//   Button,
//   Modal,
//   Form,
//   Input,
//   message,
//   notification,
//   Col,
//   Row,
//   InputNumber,
//   Select,
// } from "antd";
// import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import UpLoadImageBook from "./UpLoadImageBook";
// import { callGetBooksCategory } from "../../../service/api";

// const ModalAddBook = (props) => {
//   const [loading, setLoading] = useState(false);
//   const { open, setOpen } = props;
//   const [form] = Form.useForm();

//   const [dataSlider, setDataSlider] = useState([]);
//   const [dataThumbnail, setDataThumbnail] = useState([]);
//   const onCreate = async (values) => {
//     console.log("Received values of form: ", values);
//     // const { fullName, email, password, phone } = values;
//     setLoading(true);

//     setTimeout(() => {
//       //API create book
//       setLoading(false);
//     }, 100);
//     setOpen(false);
//   };
//   const onCancel = () => {
//     setOpen(false);
//     form.resetFields();
//   };

//   const [listCategory, setListCategory] = useState([]);
//   const fetchCategoryBook = async () => {
//     const res = await callGetBooksCategory();
//     let listTmp = [];
//     if (res && res.data) {
//       res.data.forEach((item) => {
//         listTmp.push({ value: item, label: item });
//       });
//     }
//     setListCategory(listTmp);
//   };
//   useEffect(() => {
//     fetchCategoryBook();
//   }, []);
//   return (
//     <>
//       <Modal
//         open={open}
//         width={`50vw`}
//         title='Create New Book'
//         okText='Create'
//         cancelText='Cancel'
//         onCancel={onCancel}
//         onOk={() => {
//           form
//             .validateFields()
//             .then((values) => {
//               form.resetFields();
//               onCreate(values);
//             })
//             .catch((info) => {
//               // console.log("Validate Failed:", info);
//             });
//         }}
//       >
//         <Form
//           form={form}
//           autoComplete='off'
//           layout='vertical'
//           name='form_in_modal'
//           initialValues={{
//             modifier: "public",
//           }}
//         >
//           <Row gutter={[12, 12]}>
//             {" "}
//             <Col span={12} key={uuidv4()}>
//               <Form.Item
//                 name='mainText'
//                 label='Name'
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the Name of Book!",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12} key={uuidv4()}>
//               <Form.Item
//                 name='author'
//                 label='Author'
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the author of Book",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={[12, 12]}>
//             {" "}
//             <Col span={6} key={uuidv4()}>
//               <Form.Item
//                 name='price'
//                 label='Price'
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the price of Book!",
//                   },
//                 ]}
//               >
//                 <InputNumber
//                   min={0}
//                   style={{ width: "100%" }}
//                   formatter={(value) =>
//                     `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                   }
//                   addonAfter='VND'
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={6} key={uuidv4()}>
//               <Form.Item
//                 name='category'
//                 label='Category'
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the category of Book",
//                   },
//                 ]}
//               >
//                 <Select
//                   showSearch
//                   allowClear
//                   //  onChange={handleChange}
//                   options={listCategory}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={6} key={uuidv4()}>
//               <Form.Item
//                 name='quantity'
//                 label='Quantity'
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the quantity of Book!",
//                   },
//                 ]}
//               >
//                 <InputNumber min={0} />
//               </Form.Item>
//             </Col>
//             <Col span={6} key={uuidv4()}>
//               <Form.Item
//                 name='sold'
//                 label='Sold'
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the Sold of Book",
//                   },
//                 ]}
//               >
//                 <InputNumber min={0} />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={[12, 12]}>
//             {" "}
//             <Col span={12} key={uuidv4()}>
//               <Form.Item label='Thumbnail Image'>
//                 <UpLoadImageBook
//                   name='thumbnail'
//                   uploadConfig={{ multiple: false, maxCount: 1 }}
//                   data={dataThumbnail}
//                   setData={setDataThumbnail}
//                 ></UpLoadImageBook>
//               </Form.Item>
//             </Col>
//             <Col span={12} key={uuidv4()}>
//               <Form.Item label='Slider Image'>
//                 <UpLoadImageBook
//                   name='slider'
//                   uploadConfig={{ multiple: true }}
//                   data={dataSlider}
//                   setData={setDataSlider}
//                 ></UpLoadImageBook>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Modal>
//     </>
//   );
// };
// export default ModalAddBook;
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
  callCreateAUser,
  callGetBooksCategory,
  callUploadBookImg,
} from "../../../services/api";
// import { callGetBooksCategory } from "../../../service/api";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
const ModalAddBook = (props) => {
  const { open, setOpen } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

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
    console.log(">>> check values: ", values);
    console.log(">>> check data thumbnail: ", dataThumbnail);
    console.log(">>> check data slider: ", dataSlider);

    return;
    const { fullName, password, email, phone } = values;
    setIsSubmit(true);
    const res = await callCreateAUser(fullName, password, email, phone);
    if (res && res.data) {
      message.success("Tạo mới user thành công");
      form.resetFields();
      setOpen(false);
      await props.fetchBook();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
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

  const handleChange = (info, type) => {
    if (info.file.status === "uploading") {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
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
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };

  return (
    <>
      <Modal
        title='Thêm mới book'
        open={open}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
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
                label='Tên sách'
                name='mainText'
                rules={[
                  { required: true, message: "Vui lòng nhập tên hiển thị!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Tác giả'
                name='author'
                rules={[{ required: true, message: "Vui lòng nhập tác giả!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Giá tiền'
                name='price'
                rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
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
                label='Thể loại'
                name='category'
                rules={[{ required: true, message: "Vui lòng chọn thể loại!" }]}
              >
                <Select
                  defaultValue={null}
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
                label='Số lượng'
                name='quantity'
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Đã bán'
                name='sold'
                rules={[
                  { required: true, message: "Vui lòng nhập số lượng đã bán!" },
                ]}
                initialValue={0}
              >
                <InputNumber
                  min={0}
                  defaultValue={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Ảnh Thumbnail'
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
                  onChange={handleChange}
                  onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                  onPreview={handlePreview}
                >
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label='Ảnh Slider'
                name='slider'
              >
                <Upload
                  multiple
                  name='slider'
                  listType='picture-card'
                  className='avatar-uploader'
                  customRequest={handleUploadFileSlider}
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, "slider")}
                  onRemove={(file) => handleRemoveFile(file, "slider")}
                  onPreview={handlePreview}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
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

export default ModalAddBook;