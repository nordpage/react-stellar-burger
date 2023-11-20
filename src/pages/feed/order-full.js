import React from 'react';
import styles from './order-full.module.css'
import {useGetUserFeedQuery} from "../../services/reducers/burgerApi";
import {FadeLoader} from "react-spinners";
import SingleFeedPage from "../single-feed";
function OrderFull() {

    const { data, isLoading, isSuccess } = useGetUserFeedQuery();

    return (
        <div className={styles.container}>
            {isLoading && <div className={styles.loader}>
                <FadeLoader color="#8585AD" />
            </div>}
            {isSuccess && data !== undefined && <SingleFeedPage /> }
        </div>
    );
}

export default OrderFull;