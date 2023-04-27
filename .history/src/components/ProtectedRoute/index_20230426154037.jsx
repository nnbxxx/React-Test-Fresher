import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return <>{isAuthenticated === true ? <>{}</> : 123}</>;
};

export default ProtectedRoute;
