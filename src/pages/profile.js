import React, {useCallback, useState} from 'react';
import AppHeader from "../components/header/appHeader";
import styles from './profile.module.css'
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {getCookie, setCookie} from "../services/cookies/cookies";
import {usePostLogoutMutation} from "../services/reducers/burgerApi";

function ProfilePage() {

    const refreshToken = getCookie('refreshToken');
    let form = null;

    const [postLogout] = usePostLogoutMutation();


    const logoutUser = async form =>{

        const response = await postLogout(form).unwrap();
        try {
            if (response.success) {
                setCookie('accessToken', null)
                setCookie('refreshToken', null)
            }
        } catch (e) {
           console.error(e)
        }
    }


    let logout = useCallback(
        e => {

            if (refreshToken !== '') {
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
                        <NavLink end to="/profile/" className={styles.link}>
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