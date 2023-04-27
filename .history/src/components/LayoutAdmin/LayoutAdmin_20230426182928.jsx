import { useSelector } from "react-redux";

const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const isPermmited = isAdminRoute && user.role === "ADMIN";
  return (
    <div className='layout-app'>
      {isPermmited && <div>Header Admin</div>}
      <Outlet />
      {isPermmited && <div>Footer Admin</div>}
    </div>
  );
};
export default LayoutAdmin;
