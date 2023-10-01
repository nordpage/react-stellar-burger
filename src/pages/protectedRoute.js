import { useSelector } from 'react-redux'
import {Navigate, NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {selectCurrentUser} from "../services/reducers/authSlice";
import React from "react";
const ProtectedRoute = ({children}) => {
    const user = useSelector(selectCurrentUser);
    let location = useLocation();

    if(!user) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    return children

};

export default ProtectedRoute;