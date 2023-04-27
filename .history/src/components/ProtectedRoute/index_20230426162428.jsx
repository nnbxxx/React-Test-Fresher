import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleBaseRouter = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.user);
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

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
