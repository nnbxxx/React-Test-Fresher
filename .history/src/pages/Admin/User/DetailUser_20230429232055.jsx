import React, { useState } from "react";
import { Descriptions, Drawer } from "antd";
export const DetailUser = (props) => {
  const { open, setOpen, data } = props;
  console.log("🚀 ~ file: DetailUser.jsx:5 ~ DetailUser ~ data:", data);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      width={`50%`}
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
        <Descriptions.Item label='Id'>{data._id}</Descriptions.Item>
        <Descriptions.Item label='UseName'>{data.fullName}</Descriptions.Item>
        <Descriptions.Item label='Email'>{data.email}</Descriptions.Item>
        <Descriptions.Item label='Phone'>{data.phone}</Descriptions.Item>
        <Descriptions.Item label='Role' span={2}>
          <Badge status='processing' text={data.role} />
        </Descriptions.Item>
        <Descriptions.Item label='Create At'>
          {data.createdAt}
        </Descriptions.Item>
        <Descriptions.Item label='Update At'>
          {data.updatedAt}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
