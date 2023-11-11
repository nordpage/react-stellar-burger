import React, {useCallback} from 'react';
import styles from "./ingredients-container.module.css"
import IngredientGroup from "../ingredient-group/ingredient-group";
import PropTypes from "prop-types";
import {BUN, MAIN, SAUCE} from "../../../utils/constants";
import {useGetIngredientsQuery} from "../../../services/reducers/burgerApi";
import {FadeLoader} from "react-spinners";

const IngredientsContainer = function({onScroll}) {

     function handleScroll(event) {
         onScroll(event)
    }

    const {
        data: ingredients = [],
        isLoading,
        isFetching,
        isSuccess
    } = useGetIngredientsQuery();

    const keys = [BUN, SAUCE, MAIN]
    const sectionName = (type) => {
        switch (type) {
            case BUN:
                return "Булки";
            case SAUCE:
                return "Соусы";
            case MAIN:
                return "Начинки";

        }
    }
    const groups = useCallback((ingredients) => {
        const ingredientsMap = new Map();
        if (isSuccess && ingredients !== undefined && ingredients.length > 0) {
            ingredients.forEach((ingredient) => ingredientsMap.set(ingredient.type, {
                name: sectionName(ingredient.type),
                ingredients: ingredients.filter(item => item.type === ingredient.type)
            }));

            return <section className={`${styles.scroll} custom-scroll`} onScroll={handleScroll}>
                {
                    Array.from(keys).map((key, index) => {
                        const values = ingredientsMap.get(key);
                        return <section id = {key} className="scroll-section" data-offset={0}  key={index}>
                            <IngredientGroup name={values.name} ingredients={values.ingredients}/>
                        </section>
                    })
                }
            </section>
        } else if (isLoading && isFetching) {
            return <div className={styles.loader}>
                <FadeLoader color="#8585AD" />
            </div>
        }

    },[ingredients]);

    return (
        groups(ingredients)
    )
}

export default IngredientsContainer

IngredientsContainer.propTypes = {
  handleScroll: PropTypes.func
}