import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermmited from "./NotPermmited";

const RoleBaseRouter = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const isPermmited =
    (isAdminRoute && user.role === "ADMIN") ||
    (!isAdminRoute && (user.Role === "USER" || user.Role === "ADMIN")) ||
    user;
  if (isPermmited) return <>{props.children}</>;
  else return <NotPermmited />;
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  // const user = useSelector((state) => state.account);
  // console.log("🚀 ~ file: index.jsx:7 ~ RoleBaseRouter ~ user:", user.user);
  return (
    <>
      {isAuthenticated === true ? (
        <RoleBaseRouter>{props.children}</RoleBaseRouter>
      ) : (
        <Navigate to='/login' replace />
      )}
    </>
  );
};

export default ProtectedRoute;
