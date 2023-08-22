import React from 'react';
import styles from './ingredient-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../../utils/prop-types";

const IngredientItem = function({item, onClick}) {

    function onItemClick(item, counter) {
        onClick(item, counter);
    }

    return (
        <section className={`${styles.card} mt-6`} onClick={() => onItemClick(item, item.counter === undefined ? 1 : item.counter + 1)}>
            {item.counter > 0 && <Counter count={item.counter} size="default" extraClass={`${styles.counter} m-1`} />}
            <img src={item.image} alt={item.name} className="mb-1"/>
            <div className={`${styles.price} mb-1`}><span className="text text_type_digits-default">{item.price}</span> <CurrencyIcon type="primary" /></div>
            <div className={`${styles.title} text text_type_main-small`}>
                {item.name}
            </div>
        </section>
    )
}

export default IngredientItem;

IngredientItem.propTypes = {
    OnItemClick: PropTypes.func,
    item: ingredientPropType.isRequired
}