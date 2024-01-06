import React from 'react';
import styles from "./ingredients.module.css";
import IngredientDetails from "../components/modal/ingredient-details/ingredient-details";
import {useGetIngredientsQuery} from "../services/reducers/burgerApi";
import {FadeLoader} from "react-spinners";
import {DETAILS} from "../utils/constants";

export const IngredientsPage = () => {
    const {
        data: ingredients = [],
        isLoading,
        isFetching,
        isSuccess
    } = useGetIngredientsQuery(undefined);

    return (
        <div className={styles.container}>
            {isLoading && isFetching && <div className={styles.loader}>
                <FadeLoader color="#8585AD" />
            </div>}
            {isSuccess && ingredients !== undefined &&   <div>
                <div className={`${styles.top} mt-10 ml-10 mr-10`}>
                    <h1 className={`${styles.title} text text_type_main-large`}>{DETAILS}</h1>
                </div>
                <IngredientDetails />
            </div> }
        </div>
    );
}

export default IngredientsPage;