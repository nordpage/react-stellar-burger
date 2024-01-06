import React from "react";
import styles from "./ingredient-details.module.css"
import {useParams} from "react-router-dom";
import {CURRENT} from "../../../utils/constants";
import {useGetIngredientsQuery} from "../../../services/reducers/burgerApi";

const IngredientDetails = function () {

    const { data } = useGetIngredientsQuery(undefined);


    const {ingredientId} = useParams();

    const currentId = localStorage.getItem(CURRENT);

    const id = currentId !== null ? currentId : ingredientId;

    const item = data! !== undefined ? data!.data!.find(x => x._id === id) : null


    return <>
        {
            item && (
                <div className={styles.container}>
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
    </>
}

export default IngredientDetails