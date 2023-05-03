import { Tabs } from "antd";

const Home = () => {
  const onChange = (key) => {};
  const itemsTab = [
    {
      key: "1",
      label: `Popular`,
      children: <></>,
    },
    {
      key: "2",
      label: `New Product`,
      children: <></>,
    },
    {
      key: "3",
      label: `Low To High Price`,
      children: <></>,
    },
    {
      key: "4",
      label: `High To Low Price`,
      children: <></>,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey='1' items={itemsTab} onChange={onChange} />
    </>
  );
};
export default Home;
