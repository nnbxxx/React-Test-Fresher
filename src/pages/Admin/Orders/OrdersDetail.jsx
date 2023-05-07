import React, { useState } from "react";
import { Badge, Descriptions, Divider, Drawer } from "antd";
import moment from "moment/moment";
import ReactJson from "react-json-view";

export const DetailOrder = (props) => {
  const { open, setOpen, data, fetchListOrder } = props;
  const onClose = () => {
    setOpen(false);
    fetchListOrder();
    setFileList([]);
  };
  return (
    <Drawer width={`50%`} placement='right' onClose={onClose} open={open}>
      <Descriptions title='Detail Order' bordered column={2} size='middle'>
        <Descriptions.Item label='Id'>{data._id}</Descriptions.Item>
        <Descriptions.Item label=' Name'>{data.name}</Descriptions.Item>
        <Descriptions.Item label='Phone'>{data.phone}</Descriptions.Item>
        <Descriptions.Item label='Address'>{data.address}</Descriptions.Item>
        <Descriptions.Item label='Total Price'>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(data.totalPrice)}
        </Descriptions.Item>
        <Descriptions.Item label='Category' span={2}>
          <Badge status='processing' text={data.type} />
        </Descriptions.Item>
        <Descriptions.Item label='Create At'>
          {moment(data.createdAt).format("HH:mm:ss DD-MM-YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label='Update At'>
          {moment(data.updatedAt).format("HH:mm:ss DD-MM-YYYY")}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation='left' plain>
        Order's Detail
      </Divider>
      <div>
        <ReactJson
          src={data.detail}
          name={`Invoice details `}
          collapsed={true}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
        />
      </div>
    </Drawer>
  );
};
