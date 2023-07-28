import React from 'react';
import styles from './header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = function(){

    return (
        <header className={`${styles.nav} m-10`}>
            <div className={styles.inner}>
                <div className={styles.buttons}>
                    <a href="#constructor" className={`${styles.button} text text_type_main-small p-5`}><BurgerIcon type="primary" />Конструктор</a>
                    <a href="#list" className={`${styles.button} text text_type_main-small p-5 text_color_inactive`}><ListIcon type="secondary" />Лента заказов</a>
                </div>
                <Logo/>
                <a href="#profile" className={`${styles.button} text text_type_main-small p-5 text_color_inactive`}><ProfileIcon type="secondary" />Личный кабинет</a>
            </div>
        </header>
    )
}

export default AppHeader;