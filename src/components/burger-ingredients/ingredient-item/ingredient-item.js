import React, {useState} from 'react';
import stylesIngredientItem from './ingredient-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientItem(props) {

    function OnItemClick(item, counter) {
        props.OnItemClick(item, counter);
    }

    return (
        <section className={`${stylesIngredientItem.card} mt-6`} onClick={() => OnItemClick(props.item, props.item.counter === undefined ? 1 : props.item.counter + 1)}>
            {props.item.counter > 0 && <Counter count={props.item.counter} size="default" extraClass={`${stylesIngredientItem.counter} m-1`} />}
            <img src={props.item.image} alt={props.item.name} className="mb-1"/>
            <div className={`${stylesIngredientItem.price} mb-1`}><span className="text text_type_digits-default">{props.item.price}</span> <CurrencyIcon type="primary" /></div>
            <p className="text text_type_main-small">
                {props.item.name}
            </p>
        </section>
    )
}

export default IngredientItem;