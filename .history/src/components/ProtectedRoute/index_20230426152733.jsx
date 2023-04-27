import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return (
    <>
    {isAuthenticated : <Navigate to='/' />?<></>}
      
    </>
  );
};

export default ProtectedRoute;