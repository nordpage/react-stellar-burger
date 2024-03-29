import React from 'react';
import styles from "./feed/feed.module.css";
import {FadeLoader} from "react-spinners";
import UserOrders from "./feed/user-orders";
import {useGetUserFeedQuery} from "../services/reducers/burgerApi";

function OrdersPage() {

    const { data, isLoading, isSuccess } = useGetUserFeedQuery("general");


    return (
        <div>
            {isLoading && <div className={styles.loader}>
                <FadeLoader color="#8585AD" />
            </div>}
            {isSuccess && data && <UserOrders /> }
        </div>
    );
}

export default OrdersPage;