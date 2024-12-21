import { Navigate, Outlet } from 'react-router-dom';
import { UseAuth } from '../contexts/AuthProvider';

const PublicRoute = () => {
    const { currentUser } = UseAuth();

    return !currentUser?.token ? <Outlet /> : <Navigate to="/" />;
}

export default PublicRoute;