import React, {useContext} from 'react';
import BurgerPrice from "./burger-price/burger-price";
import styles from "./burger-constructor.module.css";
import BurgerComponent from "./burger-component/burger-component";
import {ConstructorContext} from "../../services/constructorContext";

const BurgerConstructor = function() {

    const {data: constructorData, onCheckOut: onCheckOut, onRemove: onRemove} = useContext(ConstructorContext)

    const onOrderClick = (type, order) => {
        onCheckOut(type, order)
    }

    function onRemoveFromCart(item) {
        onRemove(item)
    }


    return(
        <section className={`${styles.container} pt-25`}>
            <BurgerComponent/>
            {
                constructorData.length > 0 && <BurgerPrice/>
            }
        </section>
    )
}

export default BurgerConstructor;