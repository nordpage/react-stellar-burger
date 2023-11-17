import React from 'react';
import styles from "./feed/feed.module.css";
import {FadeLoader} from "react-spinners";
import FeedOrders from "./feed/feed-orders";
import UserOrders from "./feed/user-orders";
import {ACCESS} from "../utils/constants";
import {useGetUserFeedQuery} from "../services/reducers/burgerApi";

function OrdersPage() {

const token = localStorage.getItem(ACCESS).replace("Bearer ","")
    const {
        data: orders = [],
        isLoading,
        isFetching,
        isError,
        error,
        isSuccess
    } = useGetUserFeedQuery(token);

    return (
        <div>
            {isError && <h2>{error}</h2>}
            {isLoading && isFetching && <div className={styles.loader}>
                <FadeLoader color="#8585AD" />
            </div>}
            {isSuccess && orders && <UserOrders orders={orders} /> }
        </div>
    );
}

export default OrdersPage;