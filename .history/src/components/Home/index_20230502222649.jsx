const Home = () => {
  const onChange = (key) => {};
  const itemsTab = [
    {
      key: "1",
      label: `Tab 1`,
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
  ];
  return (
    <>
      <Tabs defaultActiveKey='1' items={itemsTab} onChange={onChange} />
    </>
  );
};
export default Home;
