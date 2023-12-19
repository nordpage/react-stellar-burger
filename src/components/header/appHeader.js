import React from 'react';
import styles from './header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink} from "react-router-dom";

const AppHeader = function(){

    return (
        <header className={`${styles.nav} m-10`}>
            <div className={styles.inner}>
                <div className={styles.buttons}>
                    <NavLink to="/" end className={styles.link}>
                        {({ isActive }) => <span className={`${styles.button} text text_type_main-small p-5 ${isActive ? '' : 'text_color_inactive'}`}><ListIcon type={isActive ? 'primary' : 'secondary'} />Конструктор</span>}
                    </NavLink>
                    <NavLink to="/feed" className={styles.link}>
                        {({ isActive }) => <span className={`${styles.button} text text_type_main-small p-5 ${isActive ? '' : 'text_color_inactive'}`}><BurgerIcon type={isActive ? 'primary' : 'secondary'} />Лента заказов</span>}
                    </NavLink>
                </div>
                <NavLink to="/" className={styles.link}><Logo/></NavLink>
                <NavLink to="/profile" className={styles.link}>
                    {({ isActive }) => <span className={`${styles.button} text text_type_main-small p-5 ${isActive ? '' : 'text_color_inactive'}`}><ProfileIcon type={isActive ? 'primary' : 'secondary'} />Личный кабинет</span>}
                </NavLink>
            </div>
        </header>
    )
}

export default AppHeader;