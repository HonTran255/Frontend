import { Navigate } from 'react-router-dom';
import { getToken } from '../../apis/auth';

const PrivateRoute = ({ children }) => {
    return  getToken() ? children : <Navigate to="/" />;
  };
export default PrivateRoute;
