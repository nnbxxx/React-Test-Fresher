import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleBaseRouter = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.acount.user);
  console.log("🚀 ~ file: index.jsx:7 ~ RoleBaseRouter ~ user:", user);
  return <></>;
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  console.log("🚀 ~ file: index.jsx:7 ~ RoleBaseRouter ~ user:", user);
  return (
    <>
      {isAuthenticated === true ? (
        <>{props.children}</>
      ) : (
        <Navigate to='/login' replace />
      )}
    </>
  );
};

export default ProtectedRoute;