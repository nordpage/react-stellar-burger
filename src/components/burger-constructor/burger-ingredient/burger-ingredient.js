import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

const BurgerIngredient = function (props) {

    return(<div className={`${styles.item}`}>
        <DragIcon type="primary"/> <ConstructorElement
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
    />
    </div>)

}

export default BurgerIngredient;