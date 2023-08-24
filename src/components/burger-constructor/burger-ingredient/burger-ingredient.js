import React, {useContext} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import {ingredientPropType} from "../../../utils/prop-types";
import {ConstructorContext} from "../../../services/constructorContext";

const BurgerIngredient = function ({item}) {

    const {onRemove: onRemove} = useContext(ConstructorContext)

    function onRemoveFromCart(item) {
        onRemove(item)
    }

    return(<div className={`${styles.item}`}>
        <DragIcon type="primary"/> <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => onRemoveFromCart(item)}
    />
    </div>)

}

export default BurgerIngredient;

BurgerIngredient.propTypes = {
    item: ingredientPropType.isRequired
}