import React from "react";
import { Drawer } from "antd";
export const DetailUser = (props) => {
  [open, setOpen] = props;
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
