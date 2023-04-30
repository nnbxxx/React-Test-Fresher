import React, { useState } from "react";
import { Drawer } from "antd";
export const DetailUser = (props) => {
  const { open, setOpen } = props;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer width={`40%`} placement='right' onClose={onClose} open={open}>
      Hello User
    </Drawer>
  );
};
