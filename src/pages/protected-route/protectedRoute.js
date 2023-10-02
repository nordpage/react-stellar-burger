import { useSelector } from 'react-redux'
import {Navigate, NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {selectCurrentUser} from "../../services/reducers/authSlice";
import React from "react";
const ProtectedRoute = ({authRequired = false, children}) => {
    const user = useSelector(selectCurrentUser);
    let location = useLocation();

    if (authRequired) {
        if(!user) {
            return <Navigate to="/login" state={{ from: location}} replace />
        }
        return children
    } else {
        if (!user) {
            return children
        }
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }


};

export default ProtectedRoute;