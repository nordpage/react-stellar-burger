import React from 'react';
import styles from "./feed/feed.module.css";
import {FadeLoader} from "react-spinners";
import FeedOrders from "./feed/feed-orders";
import UserOrders from "./feed/user-orders";
import {ACCESS} from "../utils/constants";
import {useGetUserFeedQuery} from "../services/reducers/burgerApi";

function OrdersPage() {

    const token = localStorage.getItem(ACCESS).replace("Bearer ","")
    const { data, isLoading } = useGetUserFeedQuery();


    return (
        <div>
            {isLoading && <div className={styles.loader}>
                <FadeLoader color="#8585AD" />
            </div>}
            {data && <UserOrders orders={data.orders} /> }
        </div>
    );
}

export default OrdersPage;