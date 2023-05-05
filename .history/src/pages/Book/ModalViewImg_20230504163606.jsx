import { Button, Modal, Row, Col, Image } from "antd";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
const ModalViewImg = (props) => {
  const { open, setOpen, images, title, currentIndex } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const refGallery = useRef(null);

  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
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
        <div style={{ width: "100%", display: "flex", gap: "20px" }}>
          <div style={{ width: "60%", height: "70vh" }}>
            <ImageGallery
              items={images}
              showFullscreenButton={false}
              showPlayButton={false}
              slideOnThumbnailOver={true}
              showThumbnails={false}
              ref={refGallery}
              startIndex={currentIndex}
              onSlide={(i) => setActiveIndex(i)}
            />
          </div>
          <div
            style={{
              width: "40%",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {images?.map((item, i) => {
              return (
                <>
                  <Image
                    key={`image-${i}`}
                    width={100}
                    height={100}
                    src={item.original}
                    preview={false}
                    onClick={() => {
                      refGallery.current.slideToIndex(i);
                    }}
                  />
                </>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalViewImg;
