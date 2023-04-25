import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { callRegister } from "../../service/api";
const onFinish = async (values) => {
  console.log("Success:", values);
  const { fullName, email, password, phone } = values;
  const re = await callRegister(fullName, email, password, phone);
  if (re?.data?._id) {
    alert("success");
  } else {
    console.log("🚀 ~ file: index.jsx:10 ~ onFinish ~ re:", re);
  }
};
const RegisterPage = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const Context = React.createContext({
    errorMessage: "Default",
  });
  const openNotification = () => {
    api.info({
      message: `Notification Error`,
      description: (
        <Context.Consumer>
          {({ errorMessage }) => `${errorMessage}!`}
        </Context.Consumer>
      ),
      topLeft,
    });
  };
  return (
    <>
      <div className='form-container'>
        <Form
          name='basic'
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
            margin: "0 auto",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <div className='form-title' style={{ alignItems: "center" }}>
            <h1>Sign Up</h1>
            <h2>Enter details to create your account</h2>
          </div>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                // type: "email",
                message: "Please input your email !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='FullName'
            name='fullName'
            rules={[
              {
                required: true,
                message: "Please input your FullName!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label='Phone'
            name='phone'
            rules={[
              {
                required: true,
                message: "Please input your Phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='remember'
            valuePropName='checked'
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ marginRight: "110px" }}
          >
            <Checkbox>By sign up I agree with Termes and condition</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ marginRight: "110px" }}
          >
            <Button
              type='primary'
              htmlType='submit'
              style={{ width: "100%" }}
              loading={false}
            >
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ marginRight: "110px" }}
          >
            <span>
              You have account already?{" "}
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </a>
            </span>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default RegisterPage;
