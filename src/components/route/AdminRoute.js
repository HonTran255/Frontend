import { Navigate } from 'react-router-dom';
import { getToken } from '../../apis/auth';

    const AdminRoute = ({ children }) => {
        return   getToken() && getToken().role === 'admin' ? children : <Navigate to="/" />
      };

export default AdminRoute;
