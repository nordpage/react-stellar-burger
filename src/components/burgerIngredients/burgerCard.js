import React from 'react';
import stylesCard from './card.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerCard(props) {

    return (
        <div className={`${stylesCard.card} mt-6`}>
            <img src={props.item.image} alt={props.item.name} className="mb-1"/>
            <div className={`${stylesCard.price} mb-1`}><span className="text text_type_digits-default">{props.item.price}</span> <CurrencyIcon type="primary" /></div>
            <p className="text text_type_main-small">
                {props.item.name}
            </p>
        </div>
    )
}

export default BurgerCard;