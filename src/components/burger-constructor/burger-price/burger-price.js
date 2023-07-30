import React, {useMemo} from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-price.module.css"
import {ingredientPropType} from "../../../utils/prop-types";
import PropTypes from "prop-types";
import {modalTypes} from "../../../utils/modal-types";
const BurgerPrice = function({items, onClick}) {

   const memoizedFullPrice = useMemo(() => {
       return items.reduce((total, currentValue) => total + currentValue.price,0);
    }, [items])

    const onOrderClick = (type, order) => {
        onClick(type, order)
    }

    const orderNumber = () => {
        return Math.floor(100000 + Math.random() * 900000)
    }

    return(
        <section className={`${styles.bottomContainer} mt-10 mr-4`}>
            <div className={styles.priceContainer}><p className="text text_type_digits-medium">{memoizedFullPrice}</p> <CurrencyIcon type="primary"/></div>
            <Button htmlType="button" type="primary" size="large" onClick={() => onOrderClick(modalTypes.Order, orderNumber())}>Оформить заказ</Button>
        </section>
    )
}

export default BurgerPrice

BurgerPrice.propTypes = {
    items: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}