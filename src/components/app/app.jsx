import styles from "./app.module.css";
import AppHeader from "../header/appHeader";
import {useGetIngredientsQuery} from "../../services/reducers/burgerApi";
import Main from "../main/main";
import {useDispatch} from "react-redux";
import {addAll} from "../../services/reducers/ingredientsSlice";
import {useEffect} from "react";
import {FadeLoader} from "react-spinners";

const App = function() {
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
    <div className={styles.app}>
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

export default App;
