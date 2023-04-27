const LayoutUser = () => {
  return (
    <div className='layout-app'>
      <div>Header</div>
      <Outlet />
      <div> footer</div>
    </div>
  );
};
export default LayoutUser;
