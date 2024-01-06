import React from 'react';
import BurgerPrice from "./burger-price/burger-price";
import styles from "./burger-constructor.module.css";
import BurgerComponent from "./burger-component/burger-component";
import {useAppSelector} from "../../hooks/hooks";
import {burgerSelector} from "../../services/reducers/burgerSlice";


const BurgerConstructor = function() {

    const {cart} = useAppSelector(burgerSelector)

    return(
        <section className={`${styles.container} mb-10`}>
            <BurgerComponent/>
            {
                (cart.sum > 0) && <BurgerPrice/>
            }
        </section>
    )
}

export default BurgerConstructor;