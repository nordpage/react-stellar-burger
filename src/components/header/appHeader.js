import React from 'react';
import styles from './header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, NavLink} from "react-router-dom";

const AppHeader = function(){

    return (
        <header className={`${styles.nav} m-10`}>
            <div className={styles.inner}>
                <div className={styles.buttons}>
                    <NavLink to="/" exact className={`${styles.button} text text_type_main-small p-5 ${({ isActive }) => (isActive ? 'text_color_inactive' : '')}`}><BurgerIcon type="primary" />Конструктор</NavLink>
                    <NavLink to="/profile" className={`${styles.button} text text_type_main-small p-5 ${({ isActive }) => (isActive ? 'text_color_inactive' : '')}`}><ListIcon type="secondary" />Лента заказов</NavLink>
                </div>
                <Logo/>
                <a href="#profile" className={`${styles.button} text text_type_main-small p-5 text_color_inactive`}><ProfileIcon type="secondary" />Личный кабинет</a>
            </div>
        </header>
    )
}

export default AppHeader;