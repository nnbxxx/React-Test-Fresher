import React, { useState } from "react";
import { Badge, Descriptions, Divider, Drawer } from "antd";
import moment from "moment/moment";
export const DetailBook = (props) => {
  const { open, setOpen, data } = props;
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer width={`50%`} placement='right' onClose={onClose} open={open}>
      <Descriptions title='Detail Book' bordered column={2} size='middle'>
        <Descriptions.Item label='Id'>{data._id}</Descriptions.Item>
        <Descriptions.Item label=' Book Name'>
          {data.mainText}
        </Descriptions.Item>
        <Descriptions.Item label='Author'>{data.author}</Descriptions.Item>
        <Descriptions.Item label='Price'>{data.price}</Descriptions.Item>
        <Descriptions.Item label='Category' span={2}>
          <Badge status='processing' text={data.category} />
        </Descriptions.Item>
        <Descriptions.Item label='Create At'>
          {moment(data.createdAt).format("HH:mm:ss DD-MM-YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label='Update At'>
          {moment(data.updatedAt).format("HH:mm:ss DD-MM-YYYY")}
        </Descriptions.Item>
        <Divider orientation='left'>Image's Book</Divider>
        fgorijiogrjo
      </Descriptions>
    </Drawer>
  );
};
