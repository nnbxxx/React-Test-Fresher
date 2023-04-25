import React from "react";
import { Button, Checkbox, Form, Input, Space } from "antd";
import "./index.scss";
const onFinish = (values) => {
  console.log("Success:", values);
};
const RegisterPage = () => {
  return (
    <>
      <div className='form-container'>
        <Form
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
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
          >
            <Checkbox>By sign up I agree with Termes and condition</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default RegisterPage;
