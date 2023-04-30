import React from "react";

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
