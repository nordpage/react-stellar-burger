import React from 'react';
import styles from './ingredient-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../../utils/prop-types";
import {modalTypes} from "../../../utils/modal-types";

const IngredientItem = function({item, onClick}) {

    function onItemClick(item, type) {
        onClick(item, type);
    }

    return (
        <section className={`${styles.card} mt-6`} onClick={() => onItemClick(item, modalTypes.Ingredient)}>
            {item.counter > 0 && <Counter count={item.counter} size="default" extraClass={`${styles.counter} m-1`} />}
            <img src={item.image} alt={item.name} className="mb-1"/>
            <div className={`${styles.price} mb-1`}><span className="text text_type_digits-default">{item.price}</span> <CurrencyIcon type="primary" /></div>
            <p className={`${styles.title} text text_type_main-small`}>
                {item.name}
            </p>
        </section>
    )
}

export default IngredientItem;

IngredientItem.propTypes = {
    OnItemClick: PropTypes.func,
    item: ingredientPropType.isRequired
}