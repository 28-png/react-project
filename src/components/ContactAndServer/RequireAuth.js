import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from './UseAuth';

const RequireAuth = ({ isAdmin }) => {
    const { auth } = useAuth();
    const location = useLocation();
    if (!auth || !auth.isAdmin || !auth.user) {
      // Handle the case where authentication information is not available
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    if (isAdmin) {
      // User has the required roles, allow access
      return <Outlet />;
    } else {
      // User doesn't have the required roles, redirect to unauthorized page
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  };
  
  export default RequireAuth;
  