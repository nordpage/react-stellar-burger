import React from 'react';
import BurgerPrice from "./burger-price/burger-price";
import styles from "./burger-constructor.module.css";
import BurgerComponent from "./burger-component/burger-component";
import {useSelector} from "react-redux";
import {TStore} from "../../services/reducers/store";


const BurgerConstructor = function() {

    const {cart} = useSelector((store: TStore) => store.burger)

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