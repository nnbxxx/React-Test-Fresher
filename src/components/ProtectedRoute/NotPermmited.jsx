import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const NotPermmited = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <Result
        style={style}
        status='403'
        title='403'
        subTitle='Sorry, the page you visited does not perrmited.'
        extra={
          <Button
            type='primary'
            onClick={() => {
              navigate("/");
            }}
          >
            Back Home
          </Button>
        }
      />
    </>
  );
};
export default NotPermmited;
