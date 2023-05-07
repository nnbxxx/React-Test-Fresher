import React, { useEffect } from "react";
import {
  Button,
  Modal,
  Row,
  Tabs,
  Col,
  Avatar,
  message,
  Upload,
  Form,
  Input,
  notification,
} from "antd";
import { useState } from "react";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  callPostChangePassword,
  callPutUpdateInfor,
  callUploadAvatarImg,
} from "../../service/api";
import { doUpdateUserInforAction } from "../../redux/account/accountSlice";

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
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
export const ModalManageAccount = (props) => {
  const user = useSelector((state) => state.account.user);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const { open, setOpen, urlAvatar } = props;
  const [imageUrl, setImageUrl] = useState(urlAvatar);

  const [fileUploaded, setFileUploaded] = useState(user?.avatar);
  const dispatch = useDispatch();
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
    form.setFieldValue("email", user.email);
    form.setFieldValue("username", user.fullName);
    form.setFieldValue("phonenumber", user.phone);
    setImageUrl(urlAvatar);
  };
  const handleUploadFileAvatar = async ({ file, onSuccess, onError }) => {
    const res = await callUploadAvatarImg(file);
    if (res && res.data) {
      onSuccess("ok");
      setFileUploaded(res.data.fileUploaded);
    } else {
      onError("An error occur when upload file");
    }
  };
  const propsUpload = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        getBase64(info.file.originFileObj, (url) => {
          setImageUrl(url);
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const onFinishForm1 = async (values) => {
    //console.log("Success:", values);
    const email = values.email;
    const oldpass = values.currentPassword;
    const newpass = values.newPassword;
    const res = await callPostChangePassword(email, oldpass, newpass);
    if (res && res.data) {
      message.success("Update password Successful");
      form1.setFieldValue("currentPassword", "");
      form1.setFieldValue("newPassword", "");
    } else {
      notification.error({
        message: "An error occur",
        description: res.message,
      });
    }
  };
  const onFinishForm = async (values) => {
    const fullName = values.username;
    const phone = values.phonenumber;
    const avatar = fileUploaded ? fileUploaded : user.avatar;
    const _id = user.id;
    const res = await callPutUpdateInfor(fullName, phone, avatar, _id);
    if (res && res.data) {
      message.success("Update infor Successful");
      dispatch(doUpdateUserInforAction({ avatar, phone, fullName }));
    } else {
      notification.error({
        message: "An error occur",
        description: res.message,
      });
    }
  };
  const items = [
    {
      label: <span>Update Information</span>,
      key: "1",
      children: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Avatar size={150} src={imageUrl} />
            <Upload
              {...propsUpload}
              customRequest={handleUploadFileAvatar}
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}> Upload Your Avatar</Button>
            </Upload>
          </div>

          <Form
            form={form}
            onFinish={(values) => {
              onFinishForm(values);
            }}
            autoComplete='off'
            layout='vertical'
            style={{ width: "50%" }}
          >
            <Form.Item label='Email' name='email'>
              <Input disabled />
            </Form.Item>
            <Form.Item
              label='Username'
              name='username'
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Phonenumber'
              name='phonenumber'
              rules={[
                {
                  required: true,
                  message: "Please input your Phonenumber!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      label: <span>Change Password</span>,
      key: "2",
      children: (
        <>
          <Form
            form={form1}
            onFinish={(value) => {
              onFinishForm1(value);
            }}
            autoComplete='off'
            layout='vertical'
            style={{ width: "50%" }}
          >
            <Form.Item label='Email' name='email'>
              <Input disabled />
            </Form.Item>
            <Form.Item label='Current Password' name='currentPassword'>
              <Input.Password />
            </Form.Item>
            <Form.Item label='New Password' name='newPassword'>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Accept
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    },
  ];
  useEffect(() => {
    form.setFieldValue("email", user.email);
    form1.setFieldValue("email", user.email);
    form.setFieldValue("username", user.fullName);
    form.setFieldValue("phonenumber", user.phone);
    setImageUrl(urlAvatar);
  }, [user]);

  return (
    <>
      <Modal
        width={"50vw"}
        title='Manage Account'
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
      >
        <Tabs defaultActiveKey='1' items={items}></Tabs>
      </Modal>
    </>
  );
};
