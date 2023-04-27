import React, { useState } from "react";
import { Button, Checkbox, Form, Input, notification, message } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { callLogin } from "../../service/api";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
const LoginPage = () => {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const onFinish = async (values) => {
    const { email, password } = values;
    setIsloading(true);
    const re = await callLogin(email, password);
    setIsloading(false);
    if (re?.data?.user?.id) {
      localStorage.setItem("access_token", re.data.access_token);
      dispatch(doLoginAction(re.data.user));
      message.open({
        type: "success",
        content: "Login Success",
      });
      navigate("/");
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
            maxWidth: 500,
            margin: "0 auto",
            marginTop: 200,
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
