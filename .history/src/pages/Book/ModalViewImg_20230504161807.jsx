import { Button, Modal } from "antd";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
const ModalViewImg = (props) => {
  const { open, setOpen, images, title } = props;

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={"60vw"}
        title={"hardcode"}
      >
        <div style={{ width: "60%", height: "70vh" }}>
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            slideOnThumbnailOver={true}
            showThumbnails={false}
          />
          ;
        </div>
      </Modal>
    </>
  );
};
export default ModalViewImg;
