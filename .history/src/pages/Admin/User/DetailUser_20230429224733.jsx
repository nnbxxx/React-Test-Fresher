import React from "react";
import { Avatar, Col, Divider, Drawer, List, Row } from "antd";
export const DetailUser = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      width={640}
      placement='right'
      closable={false}
      onClose={onClose}
      open={open}
    >
      hello
    </Drawer>
  );
};
