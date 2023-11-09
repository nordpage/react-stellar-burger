import React, {useEffect} from 'react';
import styles from "./ingredients.module.css";
import {useDispatch} from "react-redux";
import IngredientDetails from "../components/modal/ingredient-details/ingredient-details";
import {useGetIngredientsQuery} from "../services/reducers/burgerApi";
import {addAll} from "../services/reducers/ingredientsSlice";
import {FadeLoader} from "react-spinners";

export const IngredientsPage = () => {
    const {
        data: ingredients = [],
        isError,
        error,
        isLoading,
        isFetching,
        isSuccess
    } = useGetIngredientsQuery();
    const dispatch = useDispatch()
    useEffect(() => {
        if (isSuccess && ingredients !== undefined) {
            dispatch(addAll(ingredients))
        }
    }, [ingredients]);

    return (
        <div className={styles.container}>
            {isError && <h2>{error}</h2>}
            {isLoading && isFetching && <div className={styles.loader}>
                <FadeLoader color="#8585AD" />
            </div>}
            {isSuccess && ingredients !== undefined &&   <>
                <div className={`${styles.top} mt-10 ml-10 mr-10`}>
                    <h1 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h1>
                </div>
                <IngredientDetails />
            </> }
        </div>
    );
}

export default IngredientsPage;