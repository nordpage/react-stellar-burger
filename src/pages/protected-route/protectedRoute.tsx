import {Navigate, useLocation} from 'react-router-dom'
import React from "react";
import {ACCESS} from "../../utils/constants";

type Props = {
    authRequired: boolean,
    children: React.ReactNode
}
const ProtectedRoute = ({authRequired, children} : Props) => {
    const token = localStorage.getItem(ACCESS)
    let location = useLocation();

    if (authRequired && !token) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    if(!authRequired && token){
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    return <>
        {
            children
        }
    </>;


};

export default ProtectedRoute;