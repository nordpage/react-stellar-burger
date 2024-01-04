import React, {useCallback} from 'react';
import styles from "./orders.module.css";
import FeedOrder from "./feed-order";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {TStore} from "../../services/reducers/store";
import {IOrder} from "../../utils/types";

function UserOrders() {
    const location = useLocation();

    const {orders} = useSelector((store: TStore) => store.feed);

    const arrayForSort = [...orders]
    const sorted = useCallback(
        () => {
            if (arrayForSort !== undefined && arrayForSort.length > 0) {
                return arrayForSort.sort((a: IOrder, b: IOrder) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            }
                },
        [arrayForSort],
    );


    return orders.length > 0 && (
        <div className={styles.container}>
            <div className={`${styles.orders} custom-scroll`}>
                {
                    sorted().map(order => {
                        return <Link
                            key={order._id}
                            to={`/profile/orders/${order._id}`}
                            state={{ background: location }}
                            className={styles.link}
                        ><FeedOrder key={order._id} order={order} isUser={true}/></Link>
                    })
                }
            </div>
        </div>
    );
}

export default UserOrders;
