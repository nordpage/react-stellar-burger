import React, {useEffect, useState} from 'react';
import AppHeader from "../components/header/appHeader";
import styles from "./ingredients.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useParams} from "react-router-dom";

function IngredientsPage(props) {
    let location = useLocation();
    const ingredient =  location.state.ingredient;


    return (
        <div>
            <AppHeader/>
            <div>
                <div className={`${styles.top} mt-10 ml-10 mr-10`}>
                    <h1 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h1>
                    {/*<div className={styles.closeContainer}><CloseIcon type="primary" onClick={() => setVisibility(false)}/></div>*/}
                </div>
                <div className={`${styles.container} ml-25 mr-25 mb-15`}>
                    <img alt="Ingredient Picture" src={ingredient.image_large} className={`${styles.image} pl-5 pr-5`}/>
                    <h2 className="text text_type_main-medium mt-4">{ingredient.name}</h2>
                    <div className={`${styles.details} mt-8`}>
                        <div className={styles.detail}>
                            <h3 className="text text_type_main-default text_color_inactive">Калории,ккал</h3>
                            <h3 className="text text_type_digits-medium text_color_inactive">{ingredient.calories}</h3>
                        </div>
                        <div className={styles.detail}>
                            <h3 className="text text_type_main-default text_color_inactive">Белки, г</h3>
                            <h3 className="text text_type_digits-medium text_color_inactive">{ingredient.proteins}</h3>
                        </div>
                        <div className={styles.detail}>
                            <h3 className="text text_type_main-default text_color_inactive">Жиры, г</h3>
                            <h3 className="text text_type_digits-medium text_color_inactive">{ingredient.fat}</h3>
                        </div>
                        <div className={styles.detail}>
                            <h3 className="text text_type_main-default text_color_inactive">Углеводы, г</h3>
                            <h3 className="text text_type_digits-medium text_color_inactive">{ingredient.carbohydrates}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IngredientsPage;