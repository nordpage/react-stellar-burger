import React from 'react';
import BurgerPrice from "./burger-price/burger-price";
import styles from "./burger-constructor.module.css";
import BurgerComponent from "./burger-component/burger-component";
import {useSelector} from "react-redux";


const BurgerConstructor = function() {

    const {cart} = useSelector((store) => store.burger)

    return(
        <section className={`${styles.container} pt-25`}>
            <BurgerComponent/>
            {
                (cart.sum > 0) && <BurgerPrice/>
            }
        </section>
    )
}

export default BurgerConstructor;