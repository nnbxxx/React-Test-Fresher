import React from "react";
import { Drawer } from "antd";
export const DetailUser = (props) => {
  const [open, setOpen] = useState(false);
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
      closable={false}
      onClose={onClose}
      open={open}
    >
      hello
    </Drawer>
  );
};
