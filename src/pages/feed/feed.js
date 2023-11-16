import React, {useEffect, useState} from 'react';
import styles from "../feed.module.css"
import {useGetFeedQuery, useGetIngredientsQuery} from "../../services/reducers/burgerApi";
import {FadeLoader} from "react-spinners";
import FeedOrder from "./feed-order";

function FeedPage() {

    const {
        data: feed = [],
        isLoading,
        isFetching,
        isError,
        error,
        isSuccess
    } = useGetFeedQuery();

    return (
        <div className={styles.container}>
            <div>
                <p className="text text_type_main-large">Лента заказов</p>
                {isError && <h2>{error}</h2>}
                {isLoading && isFetching && <div className={styles.loader}>
                    <FadeLoader color="#8585AD" />
                </div>}
                {isSuccess && feed && <div className={styles.orders}>
                    {
                        feed.orders.map(order => {
                            return <FeedOrder key={order._id} order={order}/>
                        })
                    }
                </div>}
            </div>
            <div></div>
        </div>
    );
}

export default FeedPage;