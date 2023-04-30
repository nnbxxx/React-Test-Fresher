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
        column={{
          xxl: 4,
          xl: 3,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
      >
        <Descriptions.Item label='Id'>Cloud Database</Descriptions.Item>
        <Descriptions.Item label='UseName'>Prepaid</Descriptions.Item>
        <Descriptions.Item label='Email'>18:00:00</Descriptions.Item>
        <Descriptions.Item label='Phone'>$80.00</Descriptions.Item>
        <Descriptions.Item label='Role'>$20.00</Descriptions.Item>
        <Descriptions.Item label='Official'>$60.00</Descriptions.Item>
        <Descriptions.Item label='Config Info'></Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
