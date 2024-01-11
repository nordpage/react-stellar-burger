import React, {useCallback} from 'react';
import styles from "./orders.module.css";
import FeedOrder from "./feed-order";
import {Link, useLocation} from "react-router-dom";
import {IOrder} from "../../utils/types";
import {useGetIngredientsQuery} from "../../services/reducers/burgerApi";
import {useAppSelector} from "../../hooks/hooks";
import {feedSelector} from "../../services/reducers/feedSlice";

function UserOrders() {
    const location = useLocation();

    const {orders} = useAppSelector(feedSelector);

    const {
        data
    } = useGetIngredientsQuery(undefined);

    const arrayForSort = [...orders]
    const sorted = useCallback(
        () => {
            if (arrayForSort !== undefined && arrayForSort.length > 0) {
                return arrayForSort.sort((a: IOrder, b: IOrder) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            }
                },
        [arrayForSort],
    );


    return (
        <>
            {
                orders.length > 0 &&
                    <div className={styles.container}>
                        <div className={`${styles.orders} custom-scroll`}>
                            {
                                sorted()!.map(order => {
                                    return <Link
                                        key={order._id}
                                        to={`/profile/orders/${order._id}`}
                                        state={{ background: location }}
                                        className={styles.link}
                                    ><FeedOrder ingredients={data!.data!} key={order._id} order={order} isUser={true}/></Link>
                                })
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default UserOrders;
