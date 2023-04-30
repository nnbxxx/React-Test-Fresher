import React, { useState } from "react";
import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment/moment";
export const DetailUser = (props) => {
  const { open, setOpen, data } = props;
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer width={`50%`} placement='right' onClose={onClose} open={open}>
      <Descriptions title='Detail Book' bordered column={2} size='middle'>
        <Descriptions.Item label='Id'>{data._id}</Descriptions.Item>
        <Descriptions.Item label='Name Book'>{data.fullName}</Descriptions.Item>
        <Descriptions.Item label='Email'>{data.email}</Descriptions.Item>
        <Descriptions.Item label='Phone'>{data.phone}</Descriptions.Item>
        <Descriptions.Item label='Role' span={2}>
          <Badge status='processing' text={data.role} />
        </Descriptions.Item>
        <Descriptions.Item label='Create At'>
          {moment(data.createdAt).format("HH:mm:ss DD-MM-YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label='Update At'>
          {moment(data.updatedAt).format("HH:mm:ss DD-MM-YYYY")}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
