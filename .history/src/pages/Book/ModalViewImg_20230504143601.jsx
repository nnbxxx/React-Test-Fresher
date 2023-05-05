import { Button, Modal } from "antd";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
const ModalViewImg = (props) => {
  const { open, setOpen } = props;

  const handleCancel = () => {
    setOpen(false);
  };
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <>
      <Modal open={open} onCancel={handleCancel} footer={null} width={"50vw"}>
        <div style={{ width: "60%", height: "60vh" }}>
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            slideOnThumbnailOver={true}
          />
          ;
        </div>
      </Modal>
    </>
  );
};
export default ModalViewImg;
