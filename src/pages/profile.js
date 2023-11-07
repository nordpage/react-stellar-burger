import React, {useCallback} from 'react';
import AppHeader from "../components/header/appHeader";
import styles from './profile.module.css'
import {NavLink, Outlet} from "react-router-dom";
import {usePostLogoutMutation} from "../services/reducers/burgerApi";
import {useDispatch} from "react-redux";
import {logOut} from "../services/reducers/authSlice";
import {REFRESH} from "../utils/constants";

function ProfilePage() {

    const refreshToken = localStorage.getItem(REFRESH)

    let form = null;

    const [postLogout] = usePostLogoutMutation();
    const dispatch = useDispatch()


    const logoutUser = async form =>{

        const response = await postLogout(form).unwrap();
        try {
            if (response.success) {
                dispatch(logOut())
            }
        } catch (e) {
           console.error(e)
        }
    }


    let logout = useCallback(
        () => {

            if (refreshToken !== null) {
                form = { token: refreshToken }
                logoutUser(form)
            }
        },[form]
    )

    return (
        <div>
            <AppHeader/>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <div className={styles.menu_list}>
                        <NavLink to="/profile" end className={styles.link}>
                            {({ isActive }) => <span className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>Профиль</span>}
                        </NavLink>
                        <NavLink to="/profile/orders/" className={styles.link}>
                            {({ isActive }) => <span className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>История заказов</span>}
                        </NavLink>
                        <NavLink to="/" className={styles.link} onClick={logout}>
                            {({ isActive }) => <span className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>Выход</span>}
                        </NavLink>
                    </div>
                    <div className={`${styles.info} mt-26 text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</div>
                </div>
                <div className={styles.data}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;