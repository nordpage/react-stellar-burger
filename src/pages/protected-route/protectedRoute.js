import {Navigate, useLocation} from 'react-router-dom'
import React from "react";
import {getCookie} from "../../services/cookies/cookies";
const ProtectedRoute = ({authRequired = false, children}) => {
    const token = getCookie("accessToken")
    let location = useLocation();

    if (authRequired && !token) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    if(!authRequired && token){
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    return children;


};

export default ProtectedRoute;