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
          className='form-detail'
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Space
            className='form-title'
            direction='horizontal'
            style={{ width: "100%", justifyContent: "right" }}
          >
            <h1>Sign Up</h1>
            <h2>Enter details to create your account</h2>
          </Space>
          {/* <div ></div> */}
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
            wrapperCol={{
              offset: 4,
              span: 18,
            }}
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
            wrapperCol={{
              offset: 4,
              span: 18,
            }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='remember'
            valuePropName='checked'
            wrapperCol={{
              offset: 4,
              span: 18,
            }}
          >
            <Checkbox>
              By sign up I agree with <a>Termes and condition</a>
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 18,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
          <div className='form-footer'>
            You have account already?<span className='sign-in'> Sign In</span>
          </div>
        </Form>
      </div>
    </>
  );
};
export default RegisterPage;
