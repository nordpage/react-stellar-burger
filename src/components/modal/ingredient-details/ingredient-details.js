import React, {useEffect, useState} from "react";
import styles from "./ingredient-details.module.css"
import {ingredientPropType} from "../../../utils/prop-types";
import {useGetIngredientsQuery} from "../../../services/reducers/burgerApi";
import {addAll, getIngredients} from "../../../services/reducers/ingredientsSlice";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const IngredientDetails = function () {

    const {ingredients} = useSelector((store) => store.ingredients)

    const {ingredientId} = useParams();

    const item = ingredients.find(x => x._id === ingredientId)


    return item && (
        <div>
            <img alt="Ingredient Picture" src={item.image_large} className={`${styles.image} pl-5 pr-5`}/>
            <h2 className="text text_type_main-medium mt-4">{item.name}</h2>
            <div className={`${styles.details} mt-8`}>
                <div className={styles.detail}>
                    <h3 className="text text_type_main-default text_color_inactive">Калории,ккал</h3>
                    <h3 className="text text_type_digits-medium text_color_inactive">{item.calories}</h3>
                </div>
                <div className={styles.detail}>
                    <h3 className="text text_type_main-default text_color_inactive">Белки, г</h3>
                    <h3 className="text text_type_digits-medium text_color_inactive">{item.proteins}</h3>
                </div>
                <div className={styles.detail}>
                    <h3 className="text text_type_main-default text_color_inactive">Жиры, г</h3>
                    <h3 className="text text_type_digits-medium text_color_inactive">{item.fat}</h3>
                </div>
                <div className={styles.detail}>
                    <h3 className="text text_type_main-default text_color_inactive">Углеводы, г</h3>
                    <h3 className="text text_type_digits-medium text_color_inactive">{item.carbohydrates}</h3>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails

IngredientDetails.propTypes = {
   item: ingredientPropType.isRequired
}