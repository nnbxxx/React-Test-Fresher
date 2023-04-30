import React, { useState } from "react";
import { Drawer } from "antd";
export const DetailUser = (props) => {
  const { isOpen } = props;
  const [open, setOpen] = useState(isOpen);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      width={12}
      placement='right'
      onClose={onClose}
      open={open}
      title='Profile User'
    >
      Hello User
    </Drawer>
  );
};
