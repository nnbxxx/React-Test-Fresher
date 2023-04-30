import { Button, Modal, Form, Input, Radio } from "antd";
import { useState } from "react";
const ModalAddUser = (props) => {
  const [loading, setLoading] = useState(false);
  const { open, setOpen } = props;
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 200);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const [form] = Form.useForm();
  const formLayout = "Vertical";
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout = null;
  return (
    <>
      <Modal
        open={open}
        title='Add new User'
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label='Form Layout' name='layout'>
            <Radio.Group value={formLayout}>
              <Radio.Button value='horizontal'>Horizontal</Radio.Button>
              <Radio.Button value='vertical'>Vertical</Radio.Button>
              <Radio.Button value='inline'>Inline</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Field A'>
            <Input placeholder='input placeholder' />
          </Form.Item>
          <Form.Item label='Field B'>
            <Input placeholder='input placeholder' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddUser;
