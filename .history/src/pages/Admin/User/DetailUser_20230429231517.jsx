import React, { useState } from "react";
import { Descriptions, Drawer } from "antd";
export const DetailUser = (props) => {
  const { open, setOpen } = props;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      width={`45%`}
      placement='right'
      onClose={onClose}
      open={open}
      title='Profile User'
    >
      <Descriptions
        title='Responsive Descriptions'
        bordered
        column={2}
        size='middle'
      >
        <Descriptions.Item label='Id'>Cloud Database</Descriptions.Item>
        <Descriptions.Item label='UseName'>Prepaid</Descriptions.Item>
        <Descriptions.Item label='Email'>18:00:00</Descriptions.Item>
        <Descriptions.Item label='Phone'>$80.00</Descriptions.Item>
        <Descriptions.Item label='Role' span={2}>
          $20.00
        </Descriptions.Item>
        <Descriptions.Item label='Create At'>$60.00</Descriptions.Item>
        <Descriptions.Item label='Update At'></Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
