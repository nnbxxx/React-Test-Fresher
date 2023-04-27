import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleBaseRouter = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.acount.user);
  const isPermmited = isAdminRoute && user.role === "ADMIN";
  if (isPermmited) return <>{props.children}</>;
  else return <>not permmited</>;
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account);
  console.log("🚀 ~ file: index.jsx:7 ~ RoleBaseRouter ~ user:", user.user);
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
