import { Button, Modal } from "antd";
import { useState } from "react";
import { ImageGallery } from "react-image-gallery";
const ModalViewImg = (props) => {
  const { open, setOpen } = props;

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onCancel={handleCancel} footer={null} width={"50vw"}>
        <div>
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            slideOnThumbnailOver={true}
            onClick={() => {
              setIsShowModalViewImg(true);
            }}
          />
        </div>
      </Modal>
    </>
  );
};
export default ModalViewImg;
