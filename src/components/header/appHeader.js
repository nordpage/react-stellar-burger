import React from 'react';
import styles from './header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = function(){

    return (
        <header className={`${styles.nav} m-10`}>
            <div className={styles.buttons}>
                <span className={`${styles.button} text text_type_main-small p-5`}><BurgerIcon type="primary" />Конструктор</span>
                <span className={`${styles.button} text text_type_main-small p-5 text_color_inactive`}><ListIcon type="secondary" />Лента заказов</span>
            </div>
            <Logo/>
            <span className={`${styles.button} text text_type_main-small p-5 text_color_inactive`}><ProfileIcon type="secondary" />Личный кабинет</span>
        </header>
    )
}

export default AppHeader;