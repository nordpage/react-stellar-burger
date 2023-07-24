import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = function (props) {

    return(<div className="mb-4">
        <DragIcon type="primary"/> <ConstructorElement
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
    />
    </div>)

}

export default BurgerIngredient;