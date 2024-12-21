import { Navigate, Outlet } from 'react-router-dom';
import { UseAuth } from "../contexts/AuthProvider"
import { useEffect, useState } from 'react';

const AdminRoute = () => {
    const token = localStorage.getItem('token');
    const ct = localStorage.getItem('loggedUser');
    const { user_role } = JSON.parse(ct) || {};


    return token && user_role === "admin" ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute;