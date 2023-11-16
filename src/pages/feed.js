import React, {useEffect} from 'react';
import styles from "./feed.module.css"
import {useGetFeedQuery} from "../services/reducers/burgerApi";
import {FadeLoader} from "react-spinners";

function FeedPage() {

    const {
        data: feed = [],
        isLoading,
        isFetching,
        isError,
        error,
        isSuccess
    } = useGetFeedQuery();

    useEffect(() => {

    }, [feed])

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
                            return <div key={order._id} className={styles.card}>
                                <div className={styles.number}>
                                    <p className="text text_type_main-default">#{order.number}</p>
                                    <p className="text text_type_main-default text_color_inactive">
                                        The quick brown fox jumps over the lazy dog.
                                    </p>
                                </div>
                                <p className="text text_type_main-default">{order.name}</p>
                            </div>
                        })
                    }
                </div>}
            </div>
            <div></div>
        </div>
    );
}

export default FeedPage;