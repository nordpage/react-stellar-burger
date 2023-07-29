import React from "react";
import styles from "./ingredient-details.module.css"
import {ingredientPropType} from "../../../utils/prop-types";

const IngredientDetails = function (props) {

    return (
        <>
            <img alt="Ingredient Picture" src={props.item.image_large} className={`${styles.image} pl-5 pr-5`}/>
            <h2 className="text text_type_main-medium mt-4">{props.item.name}</h2>
            <div className={`${styles.details} mt-8`}>
                <div className={styles.detail}>
                    <h3 className="text text_type_main-default text_color_inactive">Калории,ккал</h3>
                    <h3 className="text text_type_digits-medium text_color_inactive">{props.item.calories}</h3>
                </div>
                <div className={styles.detail}>
                    <h3 className="text text_type_main-default text_color_inactive">Белки, г</h3>
                    <h3 className="text text_type_digits-medium text_color_inactive">{props.item.proteins}</h3>
                </div>
                <div className={styles.detail}>
                    <h3 className="text text_type_main-default text_color_inactive">Жиры, г</h3>
                    <h3 className="text text_type_digits-medium text_color_inactive">{props.item.fat}</h3>
                </div>
                <div className={styles.detail}>
                    <h3 className="text text_type_main-default text_color_inactive">Углеводы, г</h3>
                    <h3 className="text text_type_digits-medium text_color_inactive">{props.item.carbohydrates}</h3>
                </div>
            </div>
        </>
    )
}

export default IngredientDetails

IngredientDetails.propTypes = {
   item: ingredientPropType.isRequired
}