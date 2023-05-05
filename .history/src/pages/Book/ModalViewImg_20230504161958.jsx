import { Button, Modal } from "antd";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
const ModalViewImg = (props) => {
  const { open, setOpen, images, title, currentIndex } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const refGallery = useRef(null);

  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex);
    }
  }, [open, currentIndex]);
  return (
    <>
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={"60vw"}
        title={title}
      >
        <div style={{ width: "60%", height: "70vh" }}>
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            slideOnThumbnailOver={true}
            showThumbnails={false}
            ref={refGallery}
            startIndex={currentIndex}
          />
          ;
        </div>
      </Modal>
    </>
  );
};
export default ModalViewImg;
