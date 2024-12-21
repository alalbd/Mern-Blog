import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
    const token = localStorage.getItem('token');
    const ct = localStorage.getItem('loggedUser');
    const { user_role } = JSON.parse(ct) || {};

    return token && user_role === "user" ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRouter;