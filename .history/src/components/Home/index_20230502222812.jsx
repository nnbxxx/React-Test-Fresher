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
      label: `Tab 2`,
      children: <></>,
    },
    {
      key: "3",
      label: `Tab 3`,
      children: <></>,
    },
    {
      key: "4",
      label: `Tab 4`,
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
