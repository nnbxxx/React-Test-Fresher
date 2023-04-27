import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return <></>;
};

export default ProtectedRoute;
