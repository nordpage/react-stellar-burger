import React from 'react';
import styles from "./feed.module.css"
import {useGetFeedQuery} from "../../services/reducers/burgerApi";
import {FadeLoader} from "react-spinners";
import FeedOrders from "./feed-orders";
import Workflow from "./workflow";

function FeedPage() {

    const { data, isFetching, isSuccess, isLoading } = useGetFeedQuery("general");

    return (
        <div className={styles.feed}>
            {isLoading && isFetching && <div className={styles.loader}>
                <FadeLoader color="#8585AD" />
            </div>}
            {isSuccess && data &&
             <div className={styles.container}>
                 <FeedOrders />
                 <Workflow />
             </div>
            }
        </div>
    );
}

export default FeedPage;