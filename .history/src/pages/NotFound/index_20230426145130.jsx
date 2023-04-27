import { Button, Result } from "antd";
const NotFound = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={<Button type='primary'>Back Home</Button>}
    />
  );
};
export default NotFound;
