import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import {ingredientPropType} from "../../../utils/prop-types";

const BurgerIngredient = function ({item}) {

    return(<div className={`${styles.item}`}>
        <DragIcon type="primary"/> <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
    />
    </div>)

}

export default BurgerIngredient;

BurgerIngredient.propTypes = {
    item: ingredientPropType.isRequired
}