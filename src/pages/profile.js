import React from 'react';
import AppHeader from "../components/header/appHeader";
import styles from './profile.module.css'
import {NavLink, Outlet} from "react-router-dom";

function ProfilePage() {
    return (
        <div>
            <AppHeader/>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <div className={styles.menu_list}>
                        <NavLink exact="true" to="/profile/" className={`${styles.link} text text_type_main-default`}>Профиль</NavLink>
                        <NavLink to="/profile/orders" className={`${styles.link} text text_type_main-default`}>История заказов</NavLink>
                        <div className={`${styles.link} text text_type_main-default`}>Выход</div>
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