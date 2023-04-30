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
  return <div>DetailUser</div>;
};
