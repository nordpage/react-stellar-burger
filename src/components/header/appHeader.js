import React from 'react';
import stylesHeader from './header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

class AppHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header className={`${stylesHeader.nav} m-10`}>
                <div className={stylesHeader.buttons}>
                    <span className={`${stylesHeader.button} text text_type_main-small p-5`}><BurgerIcon type="primary" />Конструктор</span>
                    <span className={`${stylesHeader.button} text text_type_main-small p-5 text_color_inactive`}><ListIcon type="secondary" />Лента заказов</span>
                </div>
                <Logo/>
                <span className={`${stylesHeader.button} text text_type_main-small p-5 text_color_inactive`}><ProfileIcon type="secondary" />Личный кабинет</span>
            </header>
        )
    }
}

export default AppHeader;