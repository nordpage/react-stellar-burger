import { useSelector } from 'react-redux'
import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import {selectCurrentUser} from "../services/reducers/authSlice";
import styles from './protected-route.module.css'
import Spaceship from '../images/spaceship.svg'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
const ProtectedRoute = () => {
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate();

    function toLogin() {
        navigate("/");
    }

    // show unauthorized screen if no user is found in redux store
    if (!user) {
        return (
            <div className={styles.container}>
                <img src={Spaceship} className={styles.image}/>
                <h1>У вас нет доступа к этой странице :(</h1>
                <span className="text text_type_main-default">
          <Button extraClass={styles.button} htmlType="button" type="secondary" size="medium" onClick={() => toLogin()}>
                    Залогиньтесь</Button> для получения доступа
        </span>
            </div>
        )
    }

    // returns child route elements
    return <Outlet />
}
export default ProtectedRoute