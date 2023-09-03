import React, {useEffect} from 'react';
import {useGetIngredientsQuery} from "../services/reducers/burgerApi";
import {useDispatch} from "react-redux";
import {addAll} from "../services/reducers/ingredientsSlice";
import AppHeader from "../components/header/appHeader";
import styles from "../components/app/app.module.css";
import {FadeLoader} from "react-spinners";
import Main from "../components/main/main";

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
        <div>
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