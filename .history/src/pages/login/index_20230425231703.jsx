import React, { useState } from "react";
import { Button, Checkbox, Form, Input, notification, message } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { callRegister } from "../../service/api";
const LoginPage = () => {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const onFinish = async (values) => {
    console.log("Success:", values);
    const { fullName, email, password, phone } = values;
    setIsloading(true);
    //const re = await callRegister(fullName, email, password, phone);
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
    setTimeout(() => {
      navigate("/");
    }, 2000);

    return;
    if (re?.data?._id) {
      message.open({
        type: "success",
        content: "Login Success",
      });
    } else {
      notification.error({
        message: ` Error Message`,
        description:
          re.message && Array.isArray(re.message) ? re.message[0] : re.message,
      });
    }
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
            <h1>Sign In</h1>
            <h2>Enter details to login your account</h2>
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
            name='remember'
            valuePropName='checked'
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ marginRight: "110px" }}
          >
            <Checkbox>Remember Me</Checkbox>
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
              loading={isloading}
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
              Don't have account ? {` `}
              <a
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up
              </a>
            </span>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default LoginPage;
