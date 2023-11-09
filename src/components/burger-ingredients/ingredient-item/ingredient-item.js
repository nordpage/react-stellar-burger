import React, {useEffect, useState} from 'react';
import styles from './ingredient-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {BUN, CURRENT} from "../../../utils/constants";
import {openModal} from "../../../services/reducers/modalSlice";
import {modalTypes} from "../../../utils/modal-types";

const IngredientItem = function({item}) {

    const [counter, setCounter] = useState(0)
    const dispatch = useDispatch()
    const {cart} = useSelector((store) => store.burger)

    const [{isDragging}, drag] = useDrag(() => ({
        type: "ingredient",
        item: item ,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    useEffect(() => {
        if (item.type === BUN) {
            if (cart.bun !== null && cart.bun._id === item._id) {
                setCounter(1)
            } else {
                setCounter(0)
            }
        } else {
            if (cart.ingredients.length > 0) {
                const amount = cart.ingredients.filter(it => it._id === item._id).length;
                setCounter(amount)
            } else {
                setCounter(0)
            }
        }
    }, [cart]);

    function onItemClick(item) {
        localStorage.setItem(CURRENT, item._id)
        dispatch(openModal(modalTypes.Ingredient))
    }

    return (
        <section ref={drag} className={`${styles.card} mt-6`} onClick={() => onItemClick(item)}>
            {counter > 0 && <Counter count={counter} size="default" extraClass={`${styles.counter} m-1`} />}
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
    item: ingredientPropType.isRequired
}