import React, {useEffect, useState} from 'react';
import styles from "./feed.module.css"
import {useGetFeedQuery, useGetIngredientsQuery} from "../../services/reducers/burgerApi";
import {FadeLoader} from "react-spinners";
import FeedOrder from "./feed-order";
import FeedOrders from "./feed-orders";
import Workflow from "./workflow";

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
        <div className={styles.feed}>
            {isError && <h2>{error}</h2>}
            {isLoading && isFetching && <div className={styles.loader}>
                <FadeLoader color="#8585AD" />
            </div>}
            {isSuccess && feed &&
             <div className={styles.container}>
                 <FeedOrders orders={feed.orders} />
                 <Workflow feed={feed} />
             </div>
            }
        </div>
    );
}

export default FeedPage;