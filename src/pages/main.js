import React, {useEffect} from 'react';
import {useGetIngredientsQuery} from "../services/reducers/burgerApi";
import {useDispatch} from "react-redux";
import {addAll} from "../services/reducers/ingredientsSlice";
import AppHeader from "../components/header/appHeader";
import {FadeLoader} from "react-spinners";
import Main from "../components/main/main";
import styles from "./main.module.css"


export const MainPage = () => {

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
            <AppHeader />
            <>
                {isError && <h2>{error}</h2>}
                {isLoading && isFetching && <div className={styles.loader}>
                    <FadeLoader color="#8585AD" />
                </div>}
                {isSuccess && ingredients !== undefined && <Main/>}
            </>
        </div>
    );
}

export default MainPage;