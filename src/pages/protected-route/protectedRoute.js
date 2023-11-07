import {Navigate, useLocation} from 'react-router-dom'
import React from "react";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "../../services/reducers/authSlice";
const ProtectedRoute = ({authRequired = false, children}) => {
    const token = useSelector(selectCurrentToken)
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