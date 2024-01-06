import React, {useCallback} from 'react';
import styles from "./ingredients-container.module.css"
import IngredientGroup from "../ingredient-group/ingredient-group";
import PropTypes from "prop-types";
import {BUN, MAIN, SAUCE} from "../../../utils/constants";
import {useGetIngredientsQuery} from "../../../services/reducers/burgerApi";
import {FadeLoader} from "react-spinners";
import {Ingredient} from "../../../utils/types";

type Props = {
    onScroll: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const IngredientsContainer = function({onScroll} : Props) {

    const handleScroll: UIEvent<HTMLDivElement> = (e) => {
        onScroll(e)
    };

    const {
        data: ingredients = [],
        isLoading,
        isFetching,
        isSuccess
    } = useGetIngredientsQuery(undefined);

    const keys = [BUN, SAUCE, MAIN]
    const sectionName = (type: string) => {
        switch (type) {
            case BUN:
                return "Булки";
            case SAUCE:
                return "Соусы";
            case MAIN:
                return "Начинки";

        }
    }
    const groups = useCallback((ingredients: Ingredient[]) => {
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
        <>
            groups(ingredients)
        </>
    )
}

export default IngredientsContainer

IngredientsContainer.propTypes = {
  handleScroll: PropTypes.func
}