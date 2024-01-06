import React from 'react';
import styles from "./main.module.css"
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";


export const MainPage = () => {

    return (
        <div className={styles.container}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </div>
    );
}

export default MainPage;