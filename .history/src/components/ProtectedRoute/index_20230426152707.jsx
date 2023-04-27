import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return (
    <>
      <Navigate />
    </>
  );
};

export default ProtectedRoute;
